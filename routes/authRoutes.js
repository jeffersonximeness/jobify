import express from 'express'
import { register, login, updateUser } from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
import rateLimiter from 'express-rate-limit'

const router = express.Router()

const limiter = rateLimiter(({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10,
    message: 'Too many requests from this IP! Try again in 10 minutes.'
}))

router.route('/register').post(limiter, register)
router.route('/login').post(limiter, login)
router.route('/updateUser').patch(authenticateUser, updateUser)

export default router