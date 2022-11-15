const router = require('express').Router();

router.get('', (req, res) => {
    return res.json({errorMessage: 'Invalid URL!'});
})

router.post('', (req, res) => {
    return res.json({errorMessage: 'Invalid URL!'});
})

module.exports = router;