
const mongoose = require('mongoose');
URLSlugs = require('mongoose-url-slugs');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    summary: {
      type: String,
      require: true
    },
    body: {
      type: String,
      require: true
    },
    slug: {
      type: String,
      required: true
    }
  }
);

// articleSchema.plugin(URLSlugs('slug'));

const Articles = mongoose.model('articles', articleSchema.plugin(URLSlugs('slug')));

//Export module to export userSchema model
module.exports = Articles;
console.log("module exported")