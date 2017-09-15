import express from 'express'
import create from './../../services/users/create'
import auth from './../../services/users/auth'
import logout from './../../services/users/logout'

const router = express.Router()

router.get('/logout', logout)
router.post('/', create)
router.post('/auth', auth)

module.exports = router