import {gql} from 'react-apollo';

export default gql`
query FindTopic($id: ID!){
	  findTopic(id: $id){
	    id
	    title
	    imageURL
	    question
			perspectives {
				id
				content
				author{
					firstName
				}
			}
	  }
	}
`;
