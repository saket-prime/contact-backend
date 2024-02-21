const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModels');

//create contact
//POST /api/contacts

const createContact = asyncHandler( async (req, res) => {
    const { name, email, phone } = req.body; 
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const contact = await Contact.create({name, email, phone, user_id: req.user.id});
       
    res.status(201).json(contact);
});


// Get all contacts
// GET /api/contacts

const getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json({contacts});
});

//Get  contact
//GET /api/contacts/:id
const getContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//update  contact
//PUT /api/contacts/:id

const updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('User cannot update contacts of other user');
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact);
});

//Delete  contact
//DELETE /api/contacts/:id

const deleteContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User cannot update contacts of other user');
    }
    
    await Contact.deleteOne();
    res.status(200).json(contact);
});



module.exports = {
    getContacts,
    getContact,
    updateContact,
    deleteContact,
    createContact
};