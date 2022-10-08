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
    mutation saveAlbum($albumData: AlbumInput!) {
        saveAlbum(albumData: $albumData) {
            _id
            username
            email
            savedAlbums {
                AlbumName
                artist
                image
                link
            }
        }
    }
`;

export const REMOVE_ALBUM = gql`
    mutation removeAlbum($AlbumName: String!) {
        removeAlbum(AlbumName: $AlbumName) {
            _id
            username
            email
            savedAlbums {
                AlbumName
                artist
                image
                link
            }
            
        }    
    }
`;