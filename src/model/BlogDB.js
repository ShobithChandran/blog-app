const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my-blog');
const Schema = mongoose.Schema;

var articleSchema = new Schema({
    name: String,
    username: String,
    upvotes: Number,
    comments: Array
});

var ArticleInfo = mongoose.model('articles', articleSchema);

module.exports = ArticleInfo;