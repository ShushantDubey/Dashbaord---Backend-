const router = require('express').Router();
const controller = require('../controllers/module.controller');
const auth = require('../middleware/auth.middleware');

router.post(
    '/modules',
    controller.createModule
)

module.exports = router;