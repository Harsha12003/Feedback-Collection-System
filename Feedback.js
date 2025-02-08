const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: String,
    contactnumber: String,
    email: String,
    feedback: String
});
module.exports = mongoose.model('Feedback', feedbackSchema);