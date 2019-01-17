'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({request, auth}) {
        return await User.register({request, auth})
    }

    async login({request, auth, response}) {
        const access = await User.login({request, auth})

        return response.status(200).json(access)
    }
}

module.exports = AuthController
