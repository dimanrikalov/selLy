const router = require('express').Router();
const api = require('../services/authService');

router.post('/register', async (req, res) => {
    const { email, password, repeatPassword, name, profileImage } = req.body;

    const user = await api.findByEmail(email);
    if (user) {
        return res
            .status(403)
            .json({ errorMessage: 'Email is already taken!' });
    }

    if (password !== repeatPassword) {
        return res
            .status(400)
            .json({ errorMessage: 'Passwords do not match!' });
    }

    try {
        await api.registerUser({
            email,
            password,
            name,
            profileImage,
        });

        const user = await api.loginUser({ email, password });
        res.json({ message: 'Successfully registered!', userId: user._id });
    } catch (err) {
        res.status(400).json({ errorMessage: 'Bad request' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const user = await api.loginUser({ email, password });
        res.json({ message: 'Successfully logged in!', userId: user._id });
    } catch (err) {
        res.status(400).json({ message: 'Invalid email or password!' });
    }
});

module.exports = router;
