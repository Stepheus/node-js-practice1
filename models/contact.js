
const {default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    usermail:{
        type: String,
        required: true
    },
    userphone:{
        type: String,
        required: true
    },
    usersubject:{
        type: String,
        required: true
    },
    usermessage:{
        type: String,
        required: true
    }

})

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;

