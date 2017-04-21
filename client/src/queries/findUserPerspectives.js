import {gql} from 'react-apollo';

export default gql`
  query FindUserPerspectives($id: ID!){
    findUserPerspectives(id: $id){
      id
      content
      createdAt
      author{
        firstName
        lastName
      }
    }
  }
`;
