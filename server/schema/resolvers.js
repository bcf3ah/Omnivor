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
      return Topic.findById(id);
    },
    findAllTopics(root, args) {
      return Topic.find({});
    },
    findUserPerspectives(root, {id}){
      return User.findUserPerspectives(id);
    },
    findAllPerspectives(root, args){
      return Perspective.find({});
    },
    findCurrentUser(root, args, context){
      return context.user;
    }
  },
  Mutation: {
      addUser(root, { email, firstName, lastName }){
        return User.create({email, firstName, lastName});
      },
      addTopic(root, {title, question, imageURL}){
        return Topic.create({title, question, imageURL});
      },
      addPerspective(root, {content}, context){
        return User.addPerspective(context.user, content);
      }
  }
};
