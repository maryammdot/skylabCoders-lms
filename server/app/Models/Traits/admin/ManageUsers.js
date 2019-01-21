'use strict'

class ManageUsers {
  register (Model) {
  
    Model.togglePrivileges = async ({user, response}) => {

      if (user.role) user.role = 0; else user.role = 1

      await user.save()
      
      return response.status(200).json({user, message: 'User role successfully modified'})

    }

    Model.deleteUser = async ({user, response}) => {

      if (!user) return response.status(404).send({error: 'user not found'})

      await user.delete()
      
      return response.status(200).json({user, message: 'User successfully deleted'})

    }
  
  }
}
module.exports = ManageUsers
