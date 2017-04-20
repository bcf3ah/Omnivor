import React, {Component} from 'react';
import {Link} from 'react-router';
import {Col} from 'react-materialize';



class TopicListItem extends Component {

	render(){
        const {topic} = this.props;
        return (
            <Col s={12} m={10}>
                <div className="card horizontal" style={{height: 160}}>
                    <div>
                      <img alt='Card Jumbo' className='img-responsive' style={{width:160, height:160}} src={topic.imageURL}/>
                    </div>
                    <div className="card-stacked">
                      <div className="card-content">
                        <h6>{topic.title}</h6>
												<h6>{topic.author.firstName} {topic.author.lastName}</h6>
                        <p>{topic.question}</p>
                      </div>
                      <div className="card-action" style={{paddingTop: 8, paddingBottom: 12, paddingLeft: 14}}>
                        <Link to={`topics/${topic.id}`}>View</Link>
                      </div>
                    </div>
                </div>
            </Col>
	   );
   }
}


export default TopicListItem;
