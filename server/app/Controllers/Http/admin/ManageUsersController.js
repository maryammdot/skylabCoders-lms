'use strict'

const User = use('App/Models/User')

class ManageUsersController {

    async togglePrivileges() {

        await User.togglePrivileges(...arguments)

    }
    
    async deleteUser() {

        await User.deleteUser(...arguments)

    }

    async addUser() {

        await User.addUser(...arguments)

    }

    async allUsers() {

        await User.allUsers(...arguments)

    }

}

module.exports = ManageUsersController
