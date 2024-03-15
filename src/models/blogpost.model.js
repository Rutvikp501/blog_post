const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    author:  { type: Schema.Types.ObjectId, ref: 'user', required: true },

},
    { timestamps: true });

const blogPostmodel = mongoose.model('blogPost', blogPostSchema)
module.exports = blogPostmodel;
