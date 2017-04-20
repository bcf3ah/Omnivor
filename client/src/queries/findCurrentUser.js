import {gql} from 'react-apollo';

export default gql`
{
  findCurrentUser {
    id
    email
    firstName
    lastName
    perspectives{
      id
      content
    }
    topics{
      id
      title
      question
      imageURL
    }
  }
}
`;
