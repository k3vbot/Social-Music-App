import React, { useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeAlbumName } from '../utils/localStorage';

import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_ALBUM } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const SavedAlbums = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeAlbum] = useMutation(REMOVE_ALBUM);

  const userData = data?.me || {};
  console.log(userData);

  // Function that accepts the album's mongo _id value as param and deletes the album from the database
  const handleDeleteAlbum = async (AlbumName) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Calls the removeAlbum function to use the REMOVE_ALBUM mutation on the album with the corresponding albumName
      await removeAlbum({ variables: { AlbumName } });

      // Upon success, remove album's id from localStorage
      removeAlbumName(AlbumName);

      // Forces a refetch of the GET_ME query so that the the updated userData and component is displayed without reloading of the page
      // refetch();
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1 className='loggedUser'>Viewing {userData.username}'s albums!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2 className='searchResults'>
          {userData.savedAlbums?.length
            ? `Viewing ${userData.savedAlbums.length} saved ${userData.savedAlbums.length === 1 ? 'album' : 'albums'
            }:`
            : 'You have no saved albums!'}
        </h2>
        <CardColumns>
          {userData.savedAlbums?.map((album) => {
            console.log(album);
            return (
              <Card key={album.albumName} border='dark'>
                {album.image ? (
                  <Card.Img
                    src={album.image}
                    alt={`The cover for ${album.name}`}
                    variant='top'
                  />
                ) : null}

                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                  <p className='medium'>artist: {album.artist}</p>
                  <p href={album.link} className='medium'>link: {album.link}</p>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteAlbum(album.albumName)}
                  >
                    Deleted this Album!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedAlbums;