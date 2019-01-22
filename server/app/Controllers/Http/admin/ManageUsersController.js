'use strict'

const User = use('App/Models/User')

class ManageUsersController {

    async togglePrivileges() {

        await User.togglePrivileges(...arguments)

    }
    
    async deleteUser() {

        await User.deleteUser(...arguments)

    }

    async addStudent() {

        await User.addStudent(...arguments)

    }

}

module.exports = ManageUsersController
