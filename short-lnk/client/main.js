import {Meteor} from 'meteor/meteor'
import ReactDOM from 'react-dom'
// import {Router, Route, browserHistory} from 'react-router'
import {Tracker} from 'meteor/tracker'
import { Session } from 'meteor/session'
// import { Links } from '../imports/api/links'
import '../imports/startup/simple-schema-configuration'

import { onAuthChange, routes } from '../imports/routes/routes'

Tracker.autorun(() => {
  let isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));

});
