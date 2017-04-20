import {gql} from 'react-apollo';

export default gql`
query FindTopic($id: ID!){
	  findTopic(id: $id){
	    id
	    title
	    imageURL
	    question
			author{
				id
				firstName
				lastName
			}
			perspectives {
				id
				content
				author{
					firstName
					lastName
				}
			}
	  }
	}
`;
