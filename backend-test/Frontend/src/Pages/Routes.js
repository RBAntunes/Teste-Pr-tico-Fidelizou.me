import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from '../App'
import ContestWinners from './ContestWinners';
import GetReferralLink from './GetReferralLink'
import LinkRetrieval from './LinkRetrieval';

export default class Routes extends Component {
  render(){
    return(
      <Router>
        <Route path={ '/' } exact component={ App } />
        <Route path={ '/getLink' } exact component={ GetReferralLink }/>
        <Route path={ '/forgotLink' } exact component={ LinkRetrieval }/>
        <Route path={ '/winners' } exact component={ ContestWinners } />
      </Router>
    );
  }
}