import express from 'express';
import { User, Otp } from '../db/dbConnect.js';
import otpGenerator from 'otp-generator';
import jwt from 'jsonwebtoken'

const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
    try {
        const getUser = await User.findOne({ _id: req.user.userId });
        return res.status(200).json({ message: 'success', data: getUser });
    } catch (err) {
        return res.status(400).json({ message: 'failed', data: err });
    }
});

userRoute.post('/signup', async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'failed' });
    }
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) {
        return res.status(400).json({ message: 'Email already registered' });
    }
    const checkUsername = await User.findOne({ username: req.body.username });
    if (checkUsername) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).json({ message: 'success' });
});

userRoute.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let checkUser = null;

        if (username) {
            checkUser = await User.findOne({ username: username, password:password });
        } else if (email) {
            checkUser = await User.findOne({ email: email , password:password});
        }

        if (checkUser) {
            const token = jwt.sign(
                { userId: checkUser._id, username: checkUser.username }, 
                'pugalkmc', 
                { expiresIn: '24h' } // Token expires in 24 hours
            );
            // res.cookie({token:token})
            return res.status(200).json({ message: 'success', token: token , user: checkUser});
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
});

userRoute.get('/otp/:email', async (req, res) => {
    try {
        const OTP = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
        const email = req.params.email;
        const newOtp = new Otp({ email: email, otp: OTP });
        await newOtp.save();
        return res.status(200).json({ message: 'OTP sent', otp: OTP });
    } catch (err) {
        return res.status(400).json({ message: 'failed', error: err });
    }
});


userRoute.post('/otp/check', async (req, res) => {
    try {
        const { otp, email } = req.body;
        const otpEntry = await Otp.findOne({ email: email, otp: otp });
        if (otpEntry) {
            return res.status(200).json({ message: 'OTP verified' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (err) {
        return res.status(400).json({ message: 'Verification failed', error: err });
    }
});


userRoute.get('/watchlist', async (req,res)=>{
    try {
        const findUser = await User.find({userId: req.user._id});
        return res.json({message:'success', data:findUser})
    }
    catch {
        return res.statusCode(500);
    }
})

export default userRoute;
