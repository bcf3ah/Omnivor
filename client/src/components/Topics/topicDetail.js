import React, {Component} from 'react';
import {Row, Col, Button} from 'react-materialize';
import {graphql, compose} from 'react-apollo';
import Loader from 'halogen/MoonLoader';
import moment from 'moment';
import Textarea from 'react-textarea-autosize';
import {connect} from 'react-redux';

//Local Files
import findTopic from '../../queries/findTopic';
import addPerspective from '../../mutations/addPerspective';
import PerspectiveListItem from '../Perspectives/perspectiveListItem';

class TopicDetail extends Component {
	constructor(props){
		super(props);
		this.state={
			perspective: ''
		}
	}

	addPerspective(){
		let createdAt = moment().calendar();
		this.props.mutate({
			variables: {
				topicId: this.props.data.findTopic.id,
				content: this.state.perspective,
				createdAt
			}
		}).then(()=>this.props.data.refetch());
		//reset the perspective textarea
		this.setState({perspective: ''});
	}

	renderPerspectives(){
		return this.props.data.findTopic.perspectives.map(perspective => {
			return <PerspectiveListItem key={perspective.id} perspective={perspective} />
		})
	}



	render(){
		if(this.props.data.loading){return <div><Loader color="#26A65B" size="16px" margin="4px"/></div>}

		const topic = this.props.data.findTopic;
		return(
			<div style={{marginTop:20}}>
				<Row>
					<Col s={12} m={3} style={{textAlign: 'center'}}>
					    <div className="sideProfile">
					        <img src="https://scontent-dft4-1.xx.fbcdn.net/v/t1.0-1/c90.210.540.540/s160x160/12669513_10153359340118837_2929093189808849942_n.jpg?oh=3aeb67f1203a1e4753190e3a83b7e936&oe=593AC6D5" className="img-responsive center-block" alt="Logo" />
					        <h5 className='text-center'>{this.props.currentUserFirstName} {this.props.currentUserLastName}</h5>
					    </div>
					    <br />
					</Col>
					<Col s={12} m={6}>
						<div className="card horizontal" style={{margin: 0, height: 150}}>
		                    <div>
		                      <img alt='Card Jumbo' className='img-responsive' style={{width:150, height:150}} src={topic.imageURL}/>
		                    </div>
		                    <div className="card-stacked">
		                      <div className="card-content">
		                        <h6>{topic.title} - {topic.author.firstName} {topic.author.lastName} - {topic.createdAt}</h6>
		                        <p>{topic.question}</p>
		                      </div>
		                    </div>
		                </div>
						<div className='col s12 card-panel' style={{padding: 0}}>
							<ul className="collection" style={{margin: 0}}>
								<li className='collection-item avatar' style={{minHeight: 105, paddingBottom: 40}}>
									<img src="https://scontent-dft4-1.xx.fbcdn.net/v/t1.0-1/c90.210.540.540/s160x160/12669513_10153359340118837_2929093189808849942_n.jpg?oh=3aeb67f1203a1e4753190e3a83b7e936&oe=593AC6D5" alt="" className="circle" />
									<span className="title">{this.props.currentUserFirstName} {this.props.currentUserLastName}</span>
									<Textarea
										style={{outline: "none", resize: "none"}}
										placeholder="What's your perspective?"
										onChange={e=>this.setState({perspective: e.target.value})}
										value={this.state.perspective}
									/>
									<Button
									  className='blue'
									  waves='light'
									  icon='mode_edit'
									  style={{float: 'right', height: 30, lineHeight: 'normal'}}
										onClick={this.addPerspective.bind(this)}
									/>
								</li>
								{this.renderPerspectives()}
			        </ul>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		currentUserFirstName: state.currentUserFirstName,
		currentUserLastName: state.currentUserLastName
	}
}


const TopicDetailWithGQL = compose(
	graphql(addPerspective),
	graphql(findTopic, {
		options: (props) => {
			return {variables: {id: props.params.topicId}}
		}
	})
)(TopicDetail);

export default connect(mapStateToProps)(TopicDetailWithGQL);
