import {gql} from 'react-apollo';

export default gql`
mutation AddPerspective($topicId: ID!, $content: String!){
  addPerspective(topicId: $topicId, content:$content){
    content
    topicId
  }
}
`;
