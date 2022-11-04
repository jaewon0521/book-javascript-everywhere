import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';
import { useCallback } from 'react';
import { GET_NOTES } from '../gql/query';

const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  const handleNextPage = useCallback(() => {
    fetchMore({
      variables: { cursor: data.noteFeed.cursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          noteFeed: {
            cursor: fetchMoreResult.noteFeed.cursor,
            hasNextPage: fetchMoreResult.notefeed.hasNextPage,
            notes: [
              ...previousResult.noteFeed.notes,
              ...fetchMoreResult.noteFeed.notes
            ],
            _typename: 'noteFeed'
          }
        };
      }
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {data.noteFeed.hasNextPage && (
        <Button onClick={handleNextPage}>Load more</Button>
      )}
    </React.Fragment>
  );
};

export default Home;
