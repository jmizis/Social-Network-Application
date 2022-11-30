const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
 {
    thoughtText: {
        type: String,
        require: true,
        minlength: 1,
        maxlenght: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: timeStamp => dateFormat(timeStamp)
    },
    userName: {
        type: String,
        required: true,
    },

    reaction: [reactionSchema]

    
 },
 {
    toJSON: {virtuals: true, getters: true}
 }
);

// Add virtual
thoughtSchema.virtual('reactionCount').get(function(){return this.reaction.length})

// Make model of Thought
// casting a model
const Thought = model('Thought', thoughtSchema)
module.exports = Thought;
