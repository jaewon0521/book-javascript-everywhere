import { useMutation } from '@apollo/client';
import React from 'react';
import { useState } from 'react';
import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVOIRTES } from '../gql/query';
import ButtonAsLink from './ButtonAsLink';

const FavoriteNote = props => {
  const [count, setCount] = useState(props.favoriteCount);
  const [favorited, setFavorited] = useState(
    props.me.favorites.filter(note => note.id === props.noteId).length > 0
  );
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: { id: props.noteId },
    refetchQueries: [{ query: GET_MY_FAVOIRTES }]
  });

  const handleRemoveFavorite = () => {
    toggleFavorite();
    setFavorited(false);
    setCount(count - 1);
  };

  const handleAddFavorite = () => {
    toggleFavorite();
    setFavorited(true);
    setCount(count + 1);
  };
  return (
    <React.Fragment>
      {favorited ? (
        <ButtonAsLink onClick={handleRemoveFavorite}>
          Remove Favorite
        </ButtonAsLink>
      ) : (
        <ButtonAsLink onClick={handleAddFavorite}>Add Favorite</ButtonAsLink>
      )}
      : {count}
    </React.Fragment>
  );
};

export default FavoriteNote;
