import React from 'react';
import { useState } from 'react';
import ButtonAsLink from './ButtonAsLink';

const FavoriteNote = props => {
  const [count, setCount] = useState(props.favoriteCount);
  const [favorited, setFavorited] = useState(
    props.me.favorites.filter(note => note.id === props.noteId).length > 0
  );

  const handleRemoveFavorite = () => {
    setFavorited(false);
    setCount(count - 1);
  };

  const handleAddFavorite = () => {
    setFavorited(true);
    setCount(count + 1);
  };
  return (
    <React.Fragment>
      {favorited ? (
        <ButtonAsLink onClick={handleCount}>Remove Favorite</ButtonAsLink>
      ) : (
        <ButtonAsLink onClick={handleAddFavorite}>Add Favorite</ButtonAsLink>
      )}
    </React.Fragment>
  );
};

export default FavoriteNote;
