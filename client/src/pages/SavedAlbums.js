import  React, { useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeAlbumName } from '../utils/localStorage';

// Imports useMutation and useQuery from @apollo-client so that the imported REMOVE_ALBUM mutation and the GET_ME query can be called
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_ALBUM } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const SavedAlbums = () => {
  // Brings in the GET_ME userQuery hook with the data, the loading boolean, the refetch ability, and an error code if needed
 const { loading, error, data, refetch } = useQuery(GET_ME);

  // useEffect hook to refetch the user's saved album data every time the data changes 
  useEffect(() => {
    refetch();
  }, [refetch, data]);

  // Sets the userData variable to the data retrieved from the GET_ME query
  const userData = data?.me;

  if (error) {
    console.log(error.message);
  }

  // Applies the REMOVE_ALBUM mutation to the function removeAlbum to be called
  const [removeAlbum] = useMutation(REMOVE_ALBUM);

  // Function that accepts the album's mongo _id value as param and deletes the album from the database
  const handleDeleteAlbum = async (AlbumName) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Calls the removeAlbum function to use the REMOVE_ALBUM mutation on the album with the corresponding AlbumName
      await removeAlbum({ variables: { AlbumName }});

      // Upon success, remove album's id from localStorage
      removeAlbumName(AlbumName);

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
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved albums!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedAlbums.length
          ? `Viewing ${userData.savedAlbums.length} saved ${userData.savedAlbums.length === 1 ? 'album' : 'albums'}:`
            : 'You have no saved albums!'}
        </h2>
        <CardColumns>
          {userData.savedAlbums.map((album) => {
            return (
              <Card key={album.AlbumName} border='dark'>
                {album.image ? <Card.Img src={album.image} alt={`The cover for ${album.AlbumName}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{album.AlbumName}</Card.Title>
                  <p className='small'>Artist: {album.artist}</p>
                  <Card.Text>{album.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteAlbum(album.AlbumName)}>
                    Delete this Album!
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