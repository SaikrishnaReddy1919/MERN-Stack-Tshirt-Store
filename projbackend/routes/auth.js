var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');
const {signout, signup, signin, isSignedIn} = require('../controllers/auth')


router.post('/sign-up',[
    check('name').isLength({ min: 3 }).withMessage("Name should be atleast 3 char long."),
    check('email').isEmail({ min: 3 }).withMessage("Email is required."),
    check('password').isLength({min : 3}).withMessage("Password should be atleast 3 char long.")
], signup)

router.post('/sign-in',[
    check('email').isEmail({ min: 3 }).withMessage("Email is required."),
    check('password').isLength({min : 1}).withMessage("Password is required.")
], signin)

router.get('/sign-out', signout)

//protected route -> for testing purpose only
router.get('/testroute', isSignedIn , (req, res) => {
    res.send('Protected route')
})

module.exports = router