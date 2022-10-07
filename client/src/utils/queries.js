import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
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