import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, Row, Button} from 'react-materialize';
import * as actions from '../../actions';

class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  }

  handleFormSubmit(){
    const email = this.state.email;
    const password = this.state.password;
    //need to do sign up logic here!
    this.props.signup({email, password});
  }

  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render(){
    return (
      <Row>
          <Input type="email" label="Email" s={12} value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
          <Input type="password" label="Password" s={12} value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
          <Input type='password' label='Confirm Password' s={12} value={this.state.passwordConfirm} onChange={e => this.setState({passwordConfirm: e.target.value})}/>
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

export default connect(mapStateToProps, actions)(Signup);
