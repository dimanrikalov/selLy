const router = require('express').Router();

router.get('', (req, res) => {
    return res.json({errorMessage: 'Error getting to this URL!'});
})

router.post('', (req, res) => {
    return res.json({errorMessage: 'Error posting to this URL!'});
})

module.exports = router;