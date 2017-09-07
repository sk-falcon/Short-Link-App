import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'


import { Links } from '../api/links'

import LinksListItem from './LinksListItem'

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }

  componentDidMount() {
    console.log('Did Mount LinksList');

    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      console.log('New Links', links);

      this.setState({ links });
    });
  }

  componentWillUnmount() {
    console.log('Will Unmount LinksList');
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return (
          <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
      );
    })
  }

  render() {
    return (
        <div>
          {this.renderLinksListItems()}
        </div>
    );
  }
}
