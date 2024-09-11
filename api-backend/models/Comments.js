const mongoose = require('mongoose');

const  CommentSchema = new mongoose.Schema(
{
    content: { 
        type: String, 
        required: true 
    },
    username: { 
        type: String, 
        required: true 
    },
    userId:  { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    postId:  { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post' 
    },
},{
    timestamps: true,
});

const CommentModel = mongoose.model('Comment',CommentSchema);
module.exports = CommentModel;

