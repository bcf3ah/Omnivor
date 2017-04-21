import {gql} from 'react-apollo';

export default gql`
query FindTopic($id: ID!){
	  findTopic(id: $id){
	    id
	    title
	    imageURL
	    question
			createdAt
			author{
				id
				firstName
				lastName
			}
			perspectives {
				id
				content
				createdAt
				author{
					firstName
					lastName
				}
			}
	  }
	}
`;
