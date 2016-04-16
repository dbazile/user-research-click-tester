import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Application from './components/Application';
import Instructions from './components/Instructions';
import Step from './components/Step';
import ThankYou from './components/ThankYou';

export function bootstrap(container) {
  return render(
    <Router history={browserHistory}>
      <Route path="/" component={Application}>
        <IndexRoute component={Instructions}/>
        <Route path="/step/:stepId" component={Step}/>
        <Route path="/thankyou" component={ThankYou}/>
      </Route>
    </Router>, container);
}
