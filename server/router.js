const router = require('express').Router();
const authController = require('./controllers/authController');
const catalogController = require('./controllers/catalogController');
const aboutController = require('./controllers/aboutController');


router.use('/auth', authController);
router.use('/about', aboutController);
router.use('/catalog', catalogController);
// router.use('/profile', profileController);
// router.use('*', errorController);

module.exports = router;