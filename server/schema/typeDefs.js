const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedAlbums: [Album]
    }
    type Album {
        AlbumName: String
        artist: String
        image: String
        link: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        users: [User]
        user(_id: ID, username: String): User
        me: User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveAlbum (AlbumName: String!, artist: String!, image: String, link: String): User
        removeAlbum (AlbumName: String!): User
    }
`;

module.exports = typeDefs;