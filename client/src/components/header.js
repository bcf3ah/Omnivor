import React, {Component} from 'react';
import {Link} from 'react-router';
import {Navbar, Modal, Button, Row, Input} from 'react-materialize';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';

//Local files
import findCurrentUser from '../queries/findCurrentUser';
import * as actions from '../actions';

class Header extends Component {

      renderAuthButtons(){
        if(this.props.authenticated){
          return <li><Link to="/signin" onClick={this.handleSignout.bind(this)}>Sign out</Link></li>
        } else {
          return <li><Link to="/signin">Sign in / Sign up</Link></li>
        }
      }

      handleSignout(){
        this.props.signout();
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

                        />
                        <Input s={12}
                          label="Question to start things off" />

                        <Input s={12}
                          label="Image URL" />

                        <Button waves='light' modal='close'>Submit</Button>
                    </Row>
                  </Modal>
                </li>
            </Navbar>
        );
      }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  }
}

const HeaderWithGQL = graphql(findCurrentUser)(Header);

export default connect(mapStateToProps, actions)(HeaderWithGQL);
