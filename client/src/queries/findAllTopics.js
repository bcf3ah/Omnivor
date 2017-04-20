import {gql} from 'react-apollo';

export default gql`
{
  findAllTopics {
    id
    title
    imageURL
    question
    author {
      id
      firstName
      lastName
    }
  }
}
`;
