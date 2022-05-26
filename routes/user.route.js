const router = require('express').Router()
const controller = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')

router.post(
    '/users',
    auth(),
    controller.createUser
)

router.get(
    '/users/:id',
    auth({ hasRole: ['user'] }),
    controller.readUser 
)

router.get(
    '/users',
    auth({ hasRole: ['admin'] }),
    controller.readUsers
)

router.patch(
    '/users/:id',
    auth(),
    controller.updateUser
)

router.delete(
    '/users/:id',
    auth({ hasRole: ['admin'] }),
    controller.deleteUser
)

module.exports = router