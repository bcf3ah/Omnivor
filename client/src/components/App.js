import React, { Component } from 'react';
import {connect} from 'react-redux';


//Local Files
import '../styles/App.css';
import Header from './header';


class App extends Component {
  render() {
    return (
      <div className='container'>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App);
