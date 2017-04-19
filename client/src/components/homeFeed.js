import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import {Row, Input, Button} from 'react-materialize';

//Local Files
import findAllTopics from '../queries/findAllTopics';
import addPerspective from '../mutations/addPerspective';

class HomeFeed extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: ''
    }
  }

  addPerspective(){
    this.props.mutate({
      variables: {
        content: this.state.content
      }
    })
  }

  render(){
    return (
      <div>
        Homefeed. This should be protected.
        <Row>
            <h4>Add perspecitve</h4>
              <Input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})} s={12} />
              <Button waves='light' onClick={this.addPerspective.bind(this)}>Add Perspective</Button>
        </Row>
      </div>
    );
  }
}

export default compose(
  graphql(findAllTopics),
  graphql(addPerspective)
)(HomeFeed);
