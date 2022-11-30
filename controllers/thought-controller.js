const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
        .select('-__v')
        .then((dbUserData) => {
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        getThoughtsById(req, res) {
        Thought.findOne({ _id: req.params.ThoughtId })
        .populate('reaction')
       
        .then((dbUserData) => {
        if (!dbUserData) {
        return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        // create a new user
        createThought(req, res) {
        Thought.create(req.body)
        .then((dbUserData) => {
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        // update a user
        updateThought(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
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
        return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbUserData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        
        deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.ThoughtId })
        .then((dbUserData) => {
        res.json(dbUserData)
        
        
        })
        
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
        },
        createReaction(req, res) {
            Thought.findOneAndUpdate(
            { _id: req.params.ThoughtId },
            { $addToSet: { reaction: req.body } },
            { runValidators: true, new: true }
            )
            .then((dbThoughtData) => {
            if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
            })
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
            },
            // remove reaction from a thought
           deleteReaction(req, res) {
            Thought.findOneAndUpdate(
            { _id: req.params.ThoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
            )
            .then((dbThoughtData) => {
            if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
            })
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
            },
            
};

module.exports = thoughtController;
