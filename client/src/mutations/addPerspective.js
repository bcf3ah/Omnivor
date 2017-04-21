import {gql} from 'react-apollo';

export default gql`
mutation AddPerspective($topicId: ID!, $content: String!, $createdAt: String!){
  addPerspective(topicId: $topicId, content:$content, createdAt: $createdAt){
    id
  }
}
`;
