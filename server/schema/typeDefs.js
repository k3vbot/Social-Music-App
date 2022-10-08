const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        savedAlbums: [Album]
    }
    type Album {
        AlbumName: String!
        artist: String
        image: String
        link: String
    }
    type Auth {
        token: ID!
        user: User
    }
    input AlbumInput {
        AlbumName: String!
        artist: String!
        image: String
        link: String
    }
    type Query {
        me: User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveAlbum (albumData: AlbumInput!): User
        removeAlbum (AlbumName: String!): User
    }
`;

module.exports = typeDefs;