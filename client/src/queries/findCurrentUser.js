import {gql} from 'react-apollo';

export default gql`
{
  findCurrentUser {
    id
    email
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
