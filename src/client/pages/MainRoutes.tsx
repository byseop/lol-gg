import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeContainer from '../components/Home';
import StatsContainer from '../components/Stats';

export default function MainRoutes() {
  return (
    <Switch>
      <Route path="/" exact component={HomeContainer} />
      <Route path="/stats/:nickname" exact component={StatsContainer} />
      <Redirect to="/" />
    </Switch>
  );
}
