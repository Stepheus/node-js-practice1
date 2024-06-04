const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactInfoSchema = new Schema({
    email: {
        type: String, 
        required: false
    },
    phone: {
        type: String,
        required: false
    }
})

const blogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    contact: contactInfoSchema
}, {timestamps: true})

const Blog = mongoose.model("Blog", blogSchema);
//the name "Blog" should be the singular of the name
//of our collection in our database
module.exports = Blog;