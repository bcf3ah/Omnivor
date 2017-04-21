import React, {Component} from 'react';

class PerspectiveListItem extends Component {
	render(){
		const {perspective} = this.props;
		return (
			<li className="collection-item avatar">
			  <img src="https://scontent-dft4-1.xx.fbcdn.net/v/t1.0-1/c90.210.540.540/s160x160/12669513_10153359340118837_2929093189808849942_n.jpg?oh=3aeb67f1203a1e4753190e3a83b7e936&oe=593AC6D5" alt="" className="circle" />
			  <span className="title">{perspective.author.firstName} {perspective.author.lastName}</span> <span style={{color:'#a0a0a0', fontSize:'90%'}}> - {perspective.createdAt}</span>
			  <p>{perspective.content}</p>
			  <a href="#" className="secondary-content"><i className="material-icons">loyalty</i></a>
			</li>
		);
	}
}

export default PerspectiveListItem;
