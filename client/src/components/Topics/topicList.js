import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import {Row, Col, Tab, Tabs} from 'react-materialize';
import Loader from 'halogen/MoonLoader';
import {connect} from 'react-redux';

//Local Files
import findAllTopics from '../../queries/findAllTopics';
import TopicListItem from './topicListItem';

class TopicList extends Component {

	renderTopicListItems(){
		return this.props.data.findAllTopics.map(topic => {
			return <TopicListItem key={topic.id} topic={topic} />
		})
	}

	render(){
		if(this.props.data.loading){return <div><Loader color="#26A65B" size="16px" margin="4px"/></div>};

		return(
			<div style={{marginTop: 20}}>
				<Row>
				      <Col s={4} m={3} style={{textAlign: 'center'}}>
				          <div className="sideProfile">
				              <img src="https://scontent-dft4-1.xx.fbcdn.net/v/t1.0-1/c90.210.540.540/s160x160/12669513_10153359340118837_2929093189808849942_n.jpg?oh=3aeb67f1203a1e4753190e3a83b7e936&oe=593AC6D5" className="img-responsive center-block" alt="Logo" />
				              <h5 className='text-center'>{this.props.currentUserFirstName} {this.props.currentUserLastName}</h5>
				          </div>
				          <br />
				      </Col>
				      <Col s={8} m={9} >
				        <Tabs>
				          <Tab active={true} title='Trending'>
				            <Row>
				                {this.renderTopicListItems()}
				            </Row>
				          </Tab>
				          <Tab title='Race'>
				            <Row>

				            </Row>
				          </Tab>
				          <Tab title='Ethnicity'>
				            <Row>

				            </Row>
				          </Tab>
				          <Tab title='Gender'>
				            <Row>

				            </Row>
				          </Tab>
				          <Tab title='Class'>
				            <Row>

				            </Row>
				          </Tab>
				          <Tab title='Religion'>
				            <Row>

				            </Row>
				          </Tab>
				          <Tab title='Sexuality'>
				            <Row>

				            </Row>
				          </Tab>
				          <Tab title='Other'>
				            <Row>

				            </Row>
				          </Tab>
				        </Tabs>
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

const TopicListWithGQL = compose(
	graphql(findAllTopics)
)(TopicList);

export default connect(mapStateToProps)(TopicListWithGQL);
