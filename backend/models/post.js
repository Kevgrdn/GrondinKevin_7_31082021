const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: false },
  description: { type: String, required: false },
  imageUrl: { type: String, required: false },
  commentary:{type:String, required:false},
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: [] },
  usersDisliked: { type: Array, default: [] },
});

module.exports = mongoose.model('post', postSchema);



