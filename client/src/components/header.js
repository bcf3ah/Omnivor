import React, {Component} from 'react';
import {Link} from 'react-router';
import {Navbar, Modal, Button, Row, Input} from 'react-materialize';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';

//Local files
import addTopic from '../mutations/addTopic';
import findAllTopics from '../queries/findAllTopics';
import * as actions from '../actions';

class Header extends Component {
      constructor(props){
          super(props);
          this.state = {
            title: '',
            question: '',
            imageURL: ''
          }
      }

      addTopic(){
          this.props.mutate({
            variables: {
              title: this.state.title,
              question: this.state.question,
              imageURL: this.state.imageURL
            },
            refetchQueries: [{
              query: findAllTopics
            }]
          })
      }

      renderAuthButtons(){
        if (this.props.authenticated) {
          return [
            <li key='HeaderFirstName'><Link to='#'>{this.props.currentUserName}</Link></li>,
            <li key='HeaderSignOut'><Link to="/signout">Sign out</Link></li>
          ]
        } else {
          return <li><Link to="/signin">Sign in / Sign up</Link></li>
        }
      }

      render(){
        return (
            <Navbar style={{paddingLeft: 20, paddingRight: 20, backgroundColor: '#1E90FF'}} brand='Omnivor' right>
                <li><Link to="/home">Home</Link></li>
                {this.renderAuthButtons()}
                <li>
                  <Modal
                    header="What's on your mind?"
                    trigger={
                      <Button waves='light' style={{backgroundColor: "#66CDAA"}}>Submit New Topic</Button>
                    }
                    actions={<span></span>}
                  >
                    <Row>
                        <Input s={12}
                          label="Topic"
                          value={this.state.title}
                          onChange={e => this.setState({title: e.target.value})}
                        />
                        <Input s={12}
                          label="Question to start things off"
                          value={this.state.question}
                          onChange={e => this.setState({question: e.target.value})}
                        />
                        <Input s={12}
                          label="Image URL"
                          value={this.state.imageURL}
                          onChange={e => this.setState({imageURL: e.target.value})}
                        />
                        <Button waves='light' modal='close' onClick={this.addTopic.bind(this)}>Submit</Button>
                    </Row>
                  </Modal>
                </li>
            </Navbar>
        );
      }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated,
    currentUserName: state.currentUserName
  }
}

const HeaderWithGQL = graphql(addTopic)(Header);

export default connect(mapStateToProps, actions)(HeaderWithGQL);
