const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const Userchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },

  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogPost'
    }
  ]
});

Userchema.virtual('postCount').get(function () {
  return this.posts.length;
});

Userchema.pre('remove', function (next) {
  const BlogPost = mongoose.model('blogPost');

  BlogPost.remove({ _id }, { $in: this.blogPosts }).then(() => next());
});

const User = mongoose.model('user', Userchema);

module.exports = User;
