const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register user
//POST /api/users/register
//Acess public

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password } = req.body;
    if (!username||!email||!password) {
        res.status(400);
        throw new Error("All fields are mandatory.")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error('user already exists');
    }
    
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashPassword });
        
    if(user) {
        res.status(200).json({_id: user.id, email: user.email});
    } else{
        res.status(400);
        throw new Error('resource not created');
    }
    
});
//Login user
//POST /api/users/login
//Acess public

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory.');
    }
    const user = await User.findOne({email});
    if(!user) {
        res.status(404);
        throw new Error('Invalid user or password');
    }
    
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user: {
                    usersname: user.username,
                    email: user.email,
                    id: user.id,
                }
            }, process.env.ACCESS_TOKEN,
            { expiresIn: '1d' }
        )
        res.status(200).json({accessToken});
    }else {
        res.status(400);
        throw new Error('Invalid user or password');
    }
});
//Current user
//POST /api/users/
//Acess private

const currentUser = asyncHandler(async (req, res) => {
    // const contacts = await User.find();
    res.status(200).json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}