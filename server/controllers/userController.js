const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    // get a single user by ID or username
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!foundUser) {
            return res.status(400).json({ message: 'Cannot find a user with this ID!' });
        }

        res.json(foundUser);
    },
    // create user, sign a token, and send it back
    async createUser({ body }, res) {
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({ message: 'Something is wrong!'});
        }
        const token = signToken(user);
        res.json({ token, user });
    },
    // save album to a user's 'savedAlbum' field by adding it to the set
    async saveAlbum({ user, body }, res) {
        console.log(user);
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedAlbums: body } },
                { new: true, runValidators: true }
            );
            return res.json(updatedUser);
        } catch (error) {
            console.log(error);
            return res.status(400).json(err);
        }
    },
    // remove an album
    async deleteAlbum({ user, params }, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedAlbums: { albumId: params.albumId } } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'Could not find user'});
        }
        return res.json(updatedUser);
    }
};