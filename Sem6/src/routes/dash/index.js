import express from 'express'
const router = express.Router()

import index from './../../services/dash/index'
import by15days from './../../services/dash/by15days'
import bydays from './../../services/dash/bydays'

router.get('/', index)
router.get('/by-15-days', by15days)
router.get('/by-days', bydays)

module.exports = router