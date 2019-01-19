'use strict'

const User = use('App/Models/User')

class ManageUsersController {

    async togglePrivileges({request, response}) {
        const res = await User.togglePrivileges({request})
        return response.status(200).json(res)
    }
    
    async deleteUser({response, user}) {
        const res = await User.deleteUser({response, user})
        return response.status(200).json(res)
    }
    
}

module.exports = ManageUsersController
