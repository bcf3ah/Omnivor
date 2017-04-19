import React, {Component} from 'react';
import {Row} from 'react-materialize';
import Signup from './signup';
import Signin from './signin';

class AuthForms extends Component {
  render(){
    return (
      <div>
        <Row>
          <h1>Sign in</h1>
          <Signin />
        </Row>
        <Row>
          <h1>Sign up</h1>
          <Signup />
        </Row>
      </div>
    );
  }
}

export default AuthForms;
