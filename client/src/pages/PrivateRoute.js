import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  return (
    <Route
      {...rest}
      render={props =>
        data.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: 'siginin', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
