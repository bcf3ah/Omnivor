import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount(){
    this.props.signout();
  }

  render(){
    return (
      <div>
        See you later!
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    isAuth: state.auth.authenticated
  }
}
export default connect(mapStateToProps, actions)(Signout);
