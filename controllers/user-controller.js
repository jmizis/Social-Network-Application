const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find()
        .select('-__v')
        .then((dbUserData) => {
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .populate('friends')
        .populate('thought')
        .then((dbUserData) => {
        if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        // create a new user
        createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => {
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        // update a user
        updateUser(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.userId },
        {
        $set: req.body,
        },
        {
        runValidators: true,
        new: true,
        }
        )
        .then((dbUserData) => {
        if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        // delete user (BONUS: and delete associated thoughts)
        deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
        res.json(dbUserData)
        
        
        })
        
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        
        // add friend to friend list
        addFriends(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendsId } }, { new: true })
        .then((dbUserData) => {
        if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendsId } }, { new: true })
        .then((dbUserData) => {
        if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        };
        
 


module.exports = userController;
