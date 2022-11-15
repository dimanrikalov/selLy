const router = require('express').Router();
const authController = require('./controllers/authController');
const aboutController = require('./controllers/aboutController');
const errorController = require('./controllers/errorController');
const catalogController = require('./controllers/catalogController');
const profileController = require('./controllers/profileController');

router.use('/auth', authController);
router.use('/about', aboutController);
router.use('/catalog', catalogController);
router.use('/profile', profileController);
router.use('*', errorController);

module.exports = router;