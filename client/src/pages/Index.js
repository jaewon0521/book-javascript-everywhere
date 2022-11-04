import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from '../components/Layout';

import Home from './home';
import Favorites from './favorites';
import Mynotes from './mynotes';
import NotePage from './NotePage';
import Signup from './Signup';
import Signin from './Signin';

const Index = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/mynotes" component={Mynotes} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/note/:id" component={NotePage} />
      </Layout>
    </Router>
  );
};

export default Index;
