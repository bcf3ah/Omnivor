import {gql} from 'react-apollo';

export default gql`
  mutation AddTopic($title: String!, $question: String!, $imageURL: String!, $createdAt: String!){
    addTopic(title: $title, question: $question, imageURL: $imageURL, createdAt: $createdAt) {
      id
    }
  }
`;
