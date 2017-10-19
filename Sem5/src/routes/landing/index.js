import express from 'express'
import landing from './../../services/landing/'
import login   from './../../services/users/login'
import register from './../../services/users/register'
const router = express.Router()

router.get('/', landing)
router.get('/login', login)
router.get('/register', register)

module.exports = router