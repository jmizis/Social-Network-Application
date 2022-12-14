const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
       reactionBody: {
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
   
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
       },
   
       
    },
    {
       toJSON: {virtuals: true, getters: true}
    }
   );



module.exports = reactionSchema;
