const router = require('express').Router();
const controller = require('../controllers/events.controller');
const auth = require('../middleware/auth.middleware');

router.post(
    '/events',
    controller.createEvent
)

module.exports = router;