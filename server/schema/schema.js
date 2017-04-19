import Types from './types';
import Resolvers from './resolvers';
import {makeExecutableSchema} from 'graphql-tools';

const logger = { log: (e) => console.log(e) }//log GraphQL errors to the console

const executableSchema = makeExecutableSchema({
  typeDefs: Types,
  resolvers: Resolvers,
  logger,
  allowUndefinedInResolve: false
});

export default executableSchema;
