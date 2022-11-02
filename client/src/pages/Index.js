import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Favorites from './favorites';
import Home from './home';
import Mynotes from './mynotes';
import Layout from '../components/Layout';

const Index = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/mynotes" component={Mynotes} />
        <Route exact path="/favorites" component={Favorites} />
      </Layout>
    </Router>
  );
};

export default Index;
