import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Note from '../components/Note';

const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`;

const NotePage = props => {
  const id = props.amtch.params.id;
  const { loading, data, error } = useQuery(GET_NOTES, { variables: { id } });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error! Note not found</p>;

  return <Note note={data.note} />;
};

export default NotePage;
