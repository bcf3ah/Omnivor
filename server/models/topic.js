import mongoose from 'mongoose';
import Perspective from './perspective';

var topicSchema = new mongoose.Schema({
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        firstName: String,
        lastName: String
    },
    imageURL: String,
    title: String,
    question: String,
    createdAt: String,
    cusor: String,
    perspectives: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Perspective"
    }]
});

topicSchema.statics.addPerspective = function(topicId, content, createdAt) {
    const that = this;

    return Perspective.create({topicId, content, createdAt}, function(err, perspective){
      if(err){
        console.log(err);
      } else {
        that.findById(topicId, function(err, topic){
            if(err){
                console.log(err);
            } else {
                topic.perspectives.push(perspective);
                return topic.save();
            }
        })
      }
    });
}

topicSchema.statics.findPerspectives = function(id){
    return this.findById(id).populate('perspectives').then(topic => topic.perspectives);
}


export default mongoose.model("Topic", topicSchema);
