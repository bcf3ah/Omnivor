import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';
import {Col, Row, Tab, Tabs} from 'react-materialize';


//Local Files
import findUserPerspectives from '../../queries/findUserPerspectives';
//import findCurrentUser from '../../queries/findCurrentUser';
import MyCollectionItem from './myCollectionItem';

class ProfileHome extends Component {
  renderMyCollection(){
    //const TopicsAndPerspectives = this.props.data.findUserTopics.concat(this.props.data.findUserPerspectives);
    return this.props.data.findUserPerspectives.map(perspective => {
      return <MyCollectionItem key={perspective.id} perspective={perspective} />
    })
  }

  render(){
    if(this.props.data.loading){ return <div>Loading</div>}

    return (
      <div style={{marginTop: 20}}>
				<Row>
          <Col s={4} m={3} style={{textAlign: 'center'}}>
              <div className="sideProfile">
                  <img src="https://scontent-dft4-1.xx.fbcdn.net/v/t1.0-1/c90.210.540.540/s160x160/12669513_10153359340118837_2929093189808849942_n.jpg?oh=3aeb67f1203a1e4753190e3a83b7e936&oe=593AC6D5" className="img-responsive center-block" alt="Logo" />
                  <h5 className='text-center'>{this.props.currentUserFirstName} {this.props.currentUserLastName}</h5>
              </div>
              <br />
          </Col>
          <Col s={8} m={9}>
            <Tabs>
              <Tab active={true} title='My Collection'>
                <Row>
                  <Col s={8}>
                    <ul className='collection'>
                      {this.renderMyCollection()}
                    </ul>
                  </Col>
                </Row>
              </Tab>
              <Tab title='Dialogues'>
                <Row>

                </Row>
              </Tab>
              <Tab title='Following'>
                <Row>

                </Row>
              </Tab>
              <Tab title='Settings'>
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
    currentUserLastName: state.currentUserLastName,
    currentUserFirstName: state.currentUserFirstName
  }
}

const ProfileHomeWithGQL = compose(
  graphql(findUserPerspectives, {
    options: (props) => {
      return {variables: {id: localStorage.getItem('currentUserID')}}
    }
  })
  //graphql(findCurrentUser)
)(ProfileHome);

export default connect(mapStateToProps)(ProfileHomeWithGQL);
