import express from 'express'
import landing from './../../services/landing/'

const router = express.Router()

router.get('/', landing)

module.exports = router