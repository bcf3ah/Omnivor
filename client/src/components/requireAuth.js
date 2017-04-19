import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

export default (WrappedComponent) => {
	class authHOC extends Component {

		componentWillMount(){
			if(!this.props.authenticated){
				browserHistory.push('/');
			}
		}

		componentWillUpdate(nextProps){
			if(!nextProps.authenticated){
				browserHistory.push('/');
			}
		}

		render(){
			return <WrappedComponent {...this.props} />
		}
	}

	function mapStateToProps(state){
		return {
			authenticated: state.auth.authenticated
		}
	}

	return connect(mapStateToProps)(authHOC);
}
