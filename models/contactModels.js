const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User', 
    },
    
    name: {
        type: String,
        required: [true, 'Add Contact Name'],
    },
    email: {
        type: String,
        required: [true, 'Add contact email address'],
    },
    phone: {
        type: String,
        required: [true, 'Add contact phone number'],
    },
}, {
    timestamps: true,
});

const contactModel = mongoose.model('Contact', contactSchema);

module.exports = contactModel;