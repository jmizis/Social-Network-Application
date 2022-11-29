const { Schema, model } = require('mongoose');

const userSchema = new Schema(
 
    {
        userName: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          
        },

        email: {
        type: String,
        required: true,
        unique: true,

            

    }, 

    thought: [
        {
            type: Schema.Types.ObjectId,
            ref:"Thought"
        }
    ],

    friends: [
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    ],

},

{toJSON: {virtuals: true}}
);

// Add virtual
userSchema.virtual("friendCount").get(function (){return this.friends.length})
// Make model of User
const User = model('User', userSchema)
module.exports = User;
