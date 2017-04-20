SIGN In form

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {Row, Input, Button} from 'react-materialize';

class Signin extends Component {
  handleFormSubmit({email, password}){
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
    const {handleSubmit, fields: {email, password}} = this.props;
    return (
      <Row>
          <Input {...email} type="email" label="Email" s={12} />
          <Input {...password} type="password" label="password" s={12} />
          {this.renderAlert()}
          <Button waves='light' onClick={handleSubmit(this.handleFormSubmit.bind(this))}>Sign in</Button>
      </Row>
    );
  }
}



function mapStateToProps(state){
  return {
    errorMessage: state.auth.error
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);

===================================================================================================================================

Sign up form

import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {Input, Row, Button} from 'react-materialize';
import * as actions from '../../actions';

class Signup extends Component {

  handleFormSubmit(formProps){
      //call signup action creator
      this.props.signup(formProps);
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
    const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
    return (
      <Row>
          <Input {...email} type="email" label="Email" s={12} />
          <Input {...password} type="password" label="Password" s={12} />
          {password.touched && password.error && <div className='error'>{password.error}</div>}
          <Input {...passwordConfirm} type='password' label='Confirm Password' s={12}/>
          {password.touched && password.error && <div className='error'>{password.error}</div>}
          {this.renderAlert()}
          <Button waves='light' onClick={handleSubmit(this.handleFormSubmit.bind(this))}>Sign in</Button>
      </Row>
    );
  }
}


//validation function that connects to Redux Form below and runs this function every time you interact with the form!
function validate(formProps){
  const errors = {};
  if(formProps.password !== formProps.passwordConfirm){
    errors.password = 'Passwords must  match!';
  }
  return errors;
}

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error
  }
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
