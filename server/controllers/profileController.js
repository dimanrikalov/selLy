const router = require('express').Router();
const userService = require('../services/userService');

router.get('/', async (req, res) => {
    const user = await userService.getById(req.body.userId);
    
    if(user) {
        return res.json({ user: user });
    }
    
    return res.status(400).json({ errorMessage: 'User not found!' });
});

module.exports = router;
