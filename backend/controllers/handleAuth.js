const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');


async function handleRegister(req, res) {
    const{ email, password } = req.body;
    try{
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({msg: "User already exists"});

        user = new User({email, password: await bcrypt.hash(password, 10)});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.json({ token })
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}
async function handleLogin(req, res) {
    const{ email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({msg: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg:"Inavlid credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.json({ token })
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {
    handleLogin,
    handleRegister
}