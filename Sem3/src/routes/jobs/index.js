import express from 'express'
const router = express.Router()

import list from './../../services/jobs/list'
import show from './../../services/jobs/show'
import loggedin from './../../services/users/loggedin'

router.get('/', list)
router.get('/:id', loggedin, show)

module.exports = router