import {gql} from 'react-apollo';

export default gql`
{
  findCurrentUser {
    id
    email
  }
}
`;
