const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post('/register',
    [
        check('email', "Incorrect email").normalizeEmail().isEmail(),
        check('password', 'Minimal length of password 6 symbols')
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect registration data'
                })
            }
            const {email, password} = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({message: 'The same user already exists'});
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPassword});

            await user.save();
            res.status(201).json({message: 'User created'})

        } catch (e) {
            res.status(500)
                .json({message: "Something wrong, try again"})
        }
    })

router.post('/login',
    [
        check('email', 'Type correct e-mail').normalizeEmail().isEmail(),
        check('password', 'Enter a password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login data'
                })
            }
            const {email, password} = req.body;
            const candidate = await User.findOne({ email });
            if (!candidate) {
                return res.status(400).json({message: 'User did not find'});
            }

            const isMatch = await bcrypt.compare(password, candidate.password);
            if (!isMatch) {
                return res.status(400).json({message: 'Password is wrong'})
            }

            const token = jwt.sign(
                {userId: candidate.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.status(200).json({token, userId: candidate.id})

        } catch (e) {
            res.status(500)
                .json({message: "Something wrong, try again"})
        }

    })

module.exports = router
