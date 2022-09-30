import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_ALBUM = gql`
    mutation saveAlbum($albumName: String!, $artist: String!, $image: String, $link: String) {
        saveAlbum(albumName: $albumName, artist: $artist, image: $image, link: $link) {
            username
            savedAlbumss {
                albumName
                artist
                image
                link
            }
        }
    }
`;

export const REMOVE_ALBUM = gql`
    mutation removeAlbum($albumName: String!) {
        removeAlbum(albumName: $albumName) {
            username
            savedAlbumss {
                albumName
                artist
                image
                link
            }
            
        }    
    }
`;