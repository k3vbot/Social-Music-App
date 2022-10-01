import  React, { useEffect } from 'react';
import { Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeAlbumName } from '../utils/localStorage';

import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_ALBUM } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const SavedAlbums = () => {
 const { loading, error, data, refetch } = useQuery(GET_ME);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const userData = data?.me;

  if (error) {
    console.log(error.message);
  }

  // Applies the REMOVE_ALBUM mutation to the function removeAlbum to be called
  const [removeAlbum] = useMutation(REMOVE_ALBUM);

  // Function that accepts the album's mongo _id value as param and deletes the album from the database
  const handleDeleteAlbum = async (albumName) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Calls the removeAlbum function to use the REMOVE_ALBUM mutation on the album with the corresponding albumName
      await removeAlbum({ variables: { albumName }});

      // Upon success, remove album's id from localStorage
      removeAlbumName(albumName);

      // Forces a refetch of the GET_ME query so that the the updated userData and component is displayed without reloading of the page
      refetch();
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
      <div class='jumbotron' fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved albums!</h1>
        </Container>
      </div>
      <Container>
        <h2>
          {userData.SavedAlbums.length
          ? `Viewing ${userData.SavedAlbums.length} saved ${userData.SavedAlbums.length === 1 ? 'album' : 'albums'}:`
            : 'You have no saved albums!'}
        </h2>
        <CardColumns>
          {userData.SavedAlbums.map((album) => {
            return (
              <Card key={album.albumName} border='dark'>
                {album.image ? <Card.Img src={album.image} alt={`The cover for ${album.name}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                  <p className='medium'>artist: {album.artist}</p>
                  <p href={album.link} className='medium'>link: {album.link}</p>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteAlbum(album.albumName)}>
                    Deleted!
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