import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import passportLocalMongoose from 'passport-local-mongoose';

//Local Files
import Perspective from './perspective';
import Topic from './topic';

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, lowercase: true},
    firstName: String,
    lastName: String,
    password: String,
    age: Number,
    ethnicity: String,
    gender: String,
    religion: String,
    imageURL: String,
    followers: [{
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'User'
    }],
    perspectives: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Perspective'
    }],
    topics: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic'
    }]
});

//==============================================================================
//USER AUTHENTICATION
//==============================================================================
//on Save Hook, encrypt password using bcrypt
//before saving the user model, run this function. Literally 'pre-save'
userSchema.pre('save', function(next){
  //this gives us access to the user model. The context IS the user, and we get context via 'this'. Now have access to user.email and user.password
  const user = this;

  //generate a salt, which is a random string of characters, then run callback
  bcrypt.genSalt(10, function(err, salt){
    if(err){return next(err);}

    //hash (or encrypt) the password using the salt, then run callback. The hash in the password is the encrypted password
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err){return next(err);}

      user.password = hash;//assign the new user's password as the hashed password
      next();//move on to next step (ie save user to db)
    })
  })
});

//create method for comparing passwords. the userSchema.methods thingy lets us create any methods tied to an instance of this model. Can use statics too, and with that, we could call the method on the model directly (don't need to create a class)
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  const user = this;//same as above. The user is the context here

  //hey, bcrypt, compare the candidatePassword with the password in the db
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch){
    if(err){return callback(err);}

    //as you'll see in our Local Strategy in passport.js, this callback is literally called as the callback when we invoke this function.
    callback(null, isMatch);
  })
};

//==============================================================================
//ASSOCIATIONS
//==============================================================================
//Associate Perspectives with User (user should be the current user from context!)
userSchema.statics.addPerspective = function(user, content, topicId) {
    const that = this;
    const id = user.id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    return Perspective.create({content, topicId}, function(err, perspective){
      if(err){
        console.log(err);
      } else {
        //associate perspective with User via id, firstName and lastName
        perspective.author.id = id;
        perspective.author.firstName = firstName;
        perspective.author.lastName = lastName;
        perspective.save();

        //push it into the topic's perspective array
        Topic.findById(topicId, function(err, topic){
            if(err){
              console.log(err);
            } else {
              topic.perspectives.push(perspective);
              topic.save();
            }
        });

        //Push it into the author's perspective array
        that.findById(user.id, function(err, user){
            if(err){
                console.log(err);
            } else {
                user.perspectives.push(perspective);
                return user.save();
            }
        })
      }
    });
}

userSchema.statics.findUserPerspectives = function(id){
    return this.findById(id).populate('perspectives').then(user => user.perspectives);
}

//Associate Topics with User (user should be the current user!)
userSchema.statics.addTopic = function(user, title, question, imageURL) {
    const that = this;
    const id = user.id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    return Topic.create({title, question, imageURL}, function(err, topic){
      if(err){
        console.log(err);
      } else {
        topic.author.id = id;
        topic.author.firstName = firstName;
        topic.author.lastName = lastName;
        topic.save();
        that.findById(id, function(err, user){
            if(err){
                console.log(err);
            } else {
                user.topics.push(topic);
                return user.save();
            }
        })
      }
    });
}

userSchema.statics.findUserTopics = function(id){
    return this.findById(id).populate('topics').then(user => user.topics);
}

//==============================================================================
//Query current User via JWT and ID
//==============================================================================
userSchema.statics.findCurrentUser = function(id){
  return this.findById(id).populate('perspectives').populate('topics').exec(function(err, user){
    return user;
  });
}

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

export default mongoose.model("User", userSchema);
