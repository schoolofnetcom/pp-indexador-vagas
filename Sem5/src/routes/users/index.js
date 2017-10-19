import express from 'express'
import create from './../../services/users/create'
import auth from './../../services/users/auth'
import logout from './../../services/users/logout'
import showProfile from './../../services/users/show'
import update from './../../services/users/update'

const router = express.Router()

router.get('/logout', logout)
router.get('/:id', showProfile)
router.put('/:id', update)
router.post('/', create)
router.post('/auth', auth)

module.exports = router