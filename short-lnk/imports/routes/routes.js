import {Meteor} from 'meteor/meteor'
import React from 'react'
import {Router, Route, browserHistory} from 'react-router'


import SignUp from './../ui/Signup'
import Link from './../ui/Link'
import Login from './../ui/Login'
import NotFound from './../ui/NotFound'

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

const onEnterPublicPage = () => {
  if(Meteor.userId())browserHistory.push('/links');
};

const onEnterPrivatePage = () => {
  if(!Meteor.userId())browserHistory.push('/');
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;

  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.push('/links');
  } else if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.push('/');
  }

};

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={SignUp} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
