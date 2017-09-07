import React from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

import { Links } from '../api/links'

export default class AddLink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    };
  }

  onSubmit(e) {
    e.preventDefault();


    const url = this.refs.url.value.trim();

    if(url) {
      Meteor.call('links.insert', url);
      this.refs.url.value = '';
    }

    this.setState({ isOpen: false});

  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal isOpen={this.state.isOpen}
           contentLabel="Add Link"
           onAfterOpen={() => this.refs.url.focus()}
           onRequestClose={() => this.setState({ isOpen: false})}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" placeholder="URL"/>
          <button>Add Link</button>
        </form>
        </Modal>
      </div>
    );
  }
}
