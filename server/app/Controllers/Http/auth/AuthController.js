'use strict'

const User = use('App/Models/User')

class AuthController {

    async login() {
        await User.login(...arguments)
    }

}

module.exports = AuthController
