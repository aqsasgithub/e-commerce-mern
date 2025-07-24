import User from '../models/userSchema.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/jsontoken.js';

const createUser = asyncHandler( async (req, res)=>{
    const {username, email, password, confirmPassword, isAdmin } = req.body;

    if(!username||!email ||!password){
        throw new Error("Please fill all the required fields");
    };

    const userExists= await User.findOne({email});
if(userExists) {
    return res.status(400).send('User already exists');
}
    const salt = await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password, salt);
    const newUser = new User({username, email, password: hashedPassword});
    try {
        await newUser.save();
        generateToken(res, newUser._id);
        res.status(201).json({_id: newUser._id, username: newUser.username, email: newUser.email, isAdmin: newUser.isAdmin})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error creating user. Please try again later." });
    }
});


const userLogin = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    const existingUser= await User.findOne({email});

    if(existingUser){
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if(isPasswordValid){
            generateToken(res, existingUser._id);

            res.status(201).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            })
            return;
        }else {
            res.status(401).json({ message: 'Invalid password. Please try again.' });
            return;
        }
    }else {
        res.status(404).json({ message: 'User not found.' });
    }
});

const logoutUser = asyncHandler(async(req, res)=>{
res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
});
res.status(200).json({message: "logged out succesfully"});
});

const getAllUsers = asyncHandler(async (req, res)=>{
    const users = await User.find({});
    res.json(users);
});

const getProfile = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        }) 
    } else{
        res.status(400)
        throw new Error('User not found');
    }
});


const updateUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else{
        res.status(400);
        throw new Error('User not found');
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params._id);
    if (user) {
        if (user.isAdmin) {
            res.status(400).json({ message: "Admin cannot be deleted" });
        } else {
            await User.deleteOne({ _id: user._id });
            res.json({ message: "User deleted successfully" });
        }
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});


const getUserById = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params._id);

    if(user){
        res.status(200).json(user);
    } else{
        res.status(400);
        throw new Error('User not found');
    }
});
const updateUserById = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params._id);
    if(user){
        user.username = req.body.username|| user.username;
        user.email= req.body.email || user.email;
        user.isAdmin= Boolean(req.body.isAdmin);
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        };
        console.log(`User ${user}`);
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }else{
        res.status(400);
        throw new Error("User not found");
    };
});


export {createUser, userLogin, logoutUser, getAllUsers, getProfile, updateUser, deleteUser, getUserById, updateUserById};