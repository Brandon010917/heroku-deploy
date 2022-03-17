// Models
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Comment } = require("../models/comment.model");

// Relationships
// 1 User <-----> M Posts
const initModels = () => {
  User.hasMany(Post);
  Post.belongsTo(User);

  // 1 User <-----> M Comment
  User.hasMany(Comment);
  Comment.belongsTo(User);

  // 1 Post <-----> M Comment
  Post.hasMany(Comment);
  Comment.belongsTo(Post);
};

module.exports = { initModels };
