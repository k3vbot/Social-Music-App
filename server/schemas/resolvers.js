const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },
        user: async (parent, args) => {
            return User.findOne({
                args
            });
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('savedAlbums');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        saveAlbum: async (parent, args, context) => {
            if (context.user) {
                const updatedUserAlbums = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedAlbums: args } },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                return updatedUserAlbums;
            }

            throw new AuthenticationError('You need to be logged in to use this feature.');
        },
        removeAlbum: async (parent, { albumId }, context) => {
            if (context.user) {
                const updatedUserAlbums = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: { savedAlbums: { albumId } }
                    },
                    { new: true }
                );

                return updatedUserAlbums;
            }

            throw new AuthenticationError('You need to be logged in to use this feature.');
        },
    }
};

module.exports = resolvers;