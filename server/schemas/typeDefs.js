const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        savedAlbums: [Album]
    }
    type Album {
        albumId: String
        albumName: String
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
        user(_id: String, username: String): User
        me: User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveAlbum (albumId: String!, artist: String!, description: String, image: String, link: String): User
        removeAlbum (albumId: String!): User
    }
`;

module.exports = typeDefs;