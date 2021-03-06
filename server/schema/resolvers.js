import User from '../models/user';
import Topic from '../models/topic';
import Perspective from '../models/perspective';

export default {
  RootQuery: {
    findUser(root, {id}) {
      return User.findById(id);
    },
    findAllUsers(root, args) {
      return User.find({});
    },
    findTopic(root, {id}) {
      return Topic.findById(id).populate('perspectives');
    },
    findAllTopics(root, args) {
      return Topic.find({});
    },
    findUserTopics(root, {id}) {
      return User.findUserTopics(id);
    },
    findUserPerspectives(root, {id}){
      return User.findUserPerspectives(id);
    },
    findAllPerspectives(root, args){
      return Perspective.find({});
    },
    findCurrentUser(root, args, context){
      return User.findCurrentUser(context.user.id);
    }
  },
  Mutation: {
      addTopic(root, {title, question, imageURL, createdAt}, context){
        return User.addTopic(context.user, title, question, imageURL, createdAt);
      },
      addPerspective(root, {topicId, content, createdAt}, context){
        return User.addPerspective(context.user, content, topicId, createdAt);
      }
  }
};
