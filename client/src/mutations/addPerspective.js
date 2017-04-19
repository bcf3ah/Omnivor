import {gql} from 'react-apollo';

export default gql`
mutation AddPerspective($content: String!){
  addPerspective(content:$content){
    content
  }
}
`;
