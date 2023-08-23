const router = require('express').Router();
const {
    register,
    login,
    dashboard
} = require('../controllers/userController');
const auth = require('../middlewares/authentication')

router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', auth, dashboard);


module.exports = router;