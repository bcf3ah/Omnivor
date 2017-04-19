import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

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
userSchema.statics.addPerspective = function(user, content) {
    const that = this;
    const id = user.id;
    return Perspective.create({content}, function(err, perspective){
      if(err){
        console.log(err);
      } else {
        perspective.author.id = id; //associate perspective with User via id. Later will do names
        perspective.save();
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

//Associate Topics with User (userId should be that of the current user!)
userSchema.statics.addTopic = function(userId, title, question, imageURL, createdAt) {
    const that = this;

    return Topic.create({title, question, imageURL, createdAt}, function(err, topic){
      if(err){
        console.log(err);
      } else {
        that.findById(userId, function(err, user){
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

userSchema.statics.findPerspectives = function(id){
    return this.findById(id).populate('topics').then(user => user.topics);
}


export default mongoose.model("User", userSchema);
