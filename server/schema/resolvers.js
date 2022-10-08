const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            // console.log("16",context)

            if (context.user) {

                return await User.findOne({ _id: context.user._id }).select('-__v -password');
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
        saveAlbum: async (parent, { albumData }, context) => {
            // console.log(context.user);
            if (context.user) {
                const updatedUserAlbums = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedAlbums: albumData } },
                    {
                        new: true,
                        // runValidators: true,
                    }
                );

                return updatedUserAlbums;
            }

            throw new AuthenticationError('You need to be logged in to use this feature.');
        },
        removeAlbum: async (parent, { AlbumName }, context) => {
            if (context.user) {
                const updatedUserAlbums = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: { savedAlbums: { AlbumName } }
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