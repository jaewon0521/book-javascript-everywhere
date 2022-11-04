import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from '../components/Layout';

import Home from './home';
import Favorites from './favorites';
import Mynotes from './mynotes';
import NotePage from './NotePage';
import Signup from './Signup';
import Signin from './Signin';
import PrivateRoute from './PrivateRoute';

const Index = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/mynotes" component={Mynotes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/note/:id" component={NotePage} />
      </Layout>
    </Router>
  );
};

export default Index;
