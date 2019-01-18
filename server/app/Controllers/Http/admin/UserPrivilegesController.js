'use strict'

const User = use('App/Models/User')

class UserPrivilegesController {

    async togglePrivileges({request, response}) {
        const res = await User.togglePrivileges({request, response})
        return response.status(200).json(res)
    }
    
}

module.exports = UserPrivilegesController
