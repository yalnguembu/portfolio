const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//REGISTER

router.post('/register', async (req, res) => {
    try {
        //generation de la cle de hashage
        const salt = await bcrypt.genSalt(10);
        //hashage du mot de passe avec la cle de hashage transmise en param et le mot de pass a hasher
        const hahsedPassword = await bcrypt.hash(req.body.password, salt);
        // 
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hahsedPassword,
        });
        const user = await newUser.save();
        res.status(500).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(400).json('mot de passe ou email incorecte');

        const validate = await bcrypt.compare(req.body.password, user.password);
        !validate && res.status(400).json('mot de passe ou email incorecte');
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router