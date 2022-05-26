const router = require('express').Router()
const controller = require('../controllers/score.controller')
const auth = require('../middleware/auth.middleware')

router.post(
    '/scores',
    controller.createScore
)

module.exports = router