import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Row, Input, Button} from 'react-materialize';

class Signin extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleFormSubmit(){
    const email = this.state.email;
    const password = this.state.password;
    //need to do login logic here!
    this.props.signin({email, password});//the response to this request should be the JWT now!
  }

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render(){
    return (
      <Row>
          <Input type="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})} s={12} />
          <Input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} s={12} />
          {this.renderAlert()}
          <Button waves='light' onClick={this.handleFormSubmit.bind(this)}>Sign in</Button>
      </Row>
    );
  }
}



function mapStateToProps(state){
  return {
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(Signin);
