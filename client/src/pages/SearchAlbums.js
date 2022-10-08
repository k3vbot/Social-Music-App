import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchFmAlbums } from '../utils/API';
import { saveAlbumNames, getSavedAlbumNames } from '../utils/localStorage';

import { useMutation } from '@apollo/client';
import { SAVE_ALBUM } from '../utils/mutations'

const SearchAlbums = () => {
  // create state for holding returned fm api data
  const [searchedAlbums, setsearchedAlbums] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved AlbumName values
  const [savedAlbumNames, setSavedAlbumNames] = useState(getSavedAlbumNames());

  // Uses the SAVE_ALBUM mutation to save to album data to the ApolloServer
  const [saveAlbum, { error }] = useMutation(SAVE_ALBUM);

  // set up useEffect hook to save `savedAlbumNames` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveAlbumNames(savedAlbumNames);
  });

  // create method to search for albums and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchFmAlbums(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { results } = await response.json();
      // console.log(results.albummatches.album);
      const items = results.albummatches.album;
      const albumData = items.map((album) => ({
        AlbumName: album.name,
        artist: album.artist,
        link: album.url,
        image: album.image[3]['#text'],
      }));
      console.log(albumData, items)

      setsearchedAlbums(albumData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a album to our database
  const handleSaveAlbum = async (AlbumName) => {
    // find the album in `searchedAlbums` state by the matching id
    const albumToSave = searchedAlbums.find((album) => album.AlbumName === AlbumName);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }


    try {
      // saveAlbum mutation
      const { data } = await saveAlbum({
        variables: { albumData: { ...albumToSave } },
      });
      
      // if album successfully saves to user's account, save album id to state
      setSavedAlbumNames([...savedAlbumNames, albumToSave.AlbumName]);
      console.log(savedAlbumNames, albumToSave);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <Jumbotron fluid className='text-light bg-dark'> */}
        <Container>
          {/* <h1>Search for albums!</h1> */}
          {
            error ? `There is an error with Apollo Client ${error}!` : null
          }
          {/* <Form onSubmit={handleFormSubmit}> */}
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a album'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          {/* </Form> */}
        </Container>
      {/* </Jumbotron> */}

      <Container>
        <h2 className='searchResults'>
          {searchedAlbums.length
            ? `Viewing ${searchedAlbums.length} results:`
            : 'Search for a album to begin'}
        </h2>
        <CardColumns>
          {searchedAlbums.map((album) => {
            return (
              <Card key={album.AlbumName} border='dark'>
                {album.image ? (
                  <Card.Img src={album.image} alt={`The cover for ${album.AlbumName}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{album.AlbumName}</Card.Title>
                  <p className='medium'>artist: {album.artist}</p>
                  <p href={album.link} className='medium'>Check out the album: <a href={album.link} target='_blank' rel="noopener noreferrer">Listen Here!</a></p>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedAlbumNames?.some((savedAlbumName) => savedAlbumName === album.AlbumName)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveAlbum(album.AlbumName)}>
                      {savedAlbumNames?.some((savedAlbumName) => savedAlbumName === album.AlbumName)
                        ? 'This album has already been saved!'
                        : 'Save this album!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchAlbums;