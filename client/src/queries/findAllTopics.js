import {gql} from 'react-apollo';

export default gql`
{
  findAllTopics {
    id
    title
    imageURL
    question
    createdAt
    author {
      id
      firstName
      lastName
    }
  }
}
`;
