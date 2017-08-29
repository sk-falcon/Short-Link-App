import {Meteor} from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {Tracker} from 'meteor/tracker'

import SignUp from './../imports/ui/Signup'
import Link from './../imports/ui/Link'
import Login from './../imports/ui/Login'
import NotFound from './../imports/ui/NotFound'

// window.browserHistory = browserHistory;
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
const onEnterPublicPage = () => {
  if(Meteor.userId())browserHistory.push('/links');
};

const onEnterPrivatePage = () => {
  if(!Meteor.userId())browserHistory.push('/');
};

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={SignUp} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

Tracker.autorun(() => {
  let isAuthenticated = !!Meteor.userId();
  const pathname = browserHistory.getCurrentLocation().pathname;

  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.push('/links');
  } else if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.push('/');
  }
  // console.log('Authentication fallback', isAuthenticated);
});

Meteor.startup(() => {

  ReactDOM.render(routes, document.getElementById('app'));

});
