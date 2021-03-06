export default `
#The basis for most queries. The user determines the feed, followers, topics, perspectives, and dialogues
type User {
  id: ID!
  email: String!
  firstName: String!
  lastName: String!
  gender: String
  religion: String
  ethnicity: String
  race: String
  birthday: Int
  followers: [User!]
  perspectives: [Perspective!]
  topics: [Topic!]
  imageURL: String
}

#Current User will find the user currently logged in (via Passport's req.user)
type CurrentUser {
  currentUser: User!
}

#The topic is the main entry point of most dialogues. Includes an array of perspectives and meta data on the topic itself
type Topic {
  id: ID!
  author: User!
  title: String!
  question: String!
  imageURL: String!
  #createdAt will be a string date formed by Momentjs which takes Strings
  createdAt: String!
  #cursor is used for cursor-pagination
  cursor: String
  perspectives: [Perspective!]
}

#The perspective is like a comment for each topic. Includes front-end validation for char limits and such
type Perspective {
  id: ID!
  author: User!
  #The parent topic of the perspective
  topicId: ID!
  content: String!
  questions: String
  #createdAt is provided as a string by Momentjs
  createdAt: String
}

#Entry point for all queries
type RootQuery {
  findUser(id: ID!): User
  findAllUsers: [User]
  findTopic(id: ID!): Topic
  findAllTopics: [Topic]
  findUserTopics(id: ID!): [Topic]
  findUserPerspectives(id: ID!): [Perspective]
  findAllPerspectives: [Perspective]
  findCurrentUser: User!
}

type Mutation {
  addTopic (title: String!, question: String!, imageURL: String!, createdAt: String!): Topic
  addPerspective (topicId: ID!, content: String!, createdAt: String!): Perspective
}

schema {
  query: RootQuery
  mutation: Mutation
}
`;
