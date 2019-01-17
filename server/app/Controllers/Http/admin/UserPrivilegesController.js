'use strict'

const User = use('App/Models/User')

class UserPrivilegesController {
    async setPrivileges({request, response}) {
        const user = await User.setPrivileges({request, response})
        
        return response.status(200).send({user, message: 'User role successfully modified to Admin'})
    }

    async unsetPrivileges({request, response}) {
        const res = await User.unsetPrivileges({request, response})
        // console.log(res)
        return response.status(200).json(res)
    }
}

module.exports = UserPrivilegesController
