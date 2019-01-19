'use strict'

class ManageUsers {
  register (Model) {
  
    Model.togglePrivileges = async ({request}) => {

      const { userId } = request.all()

      const user = await Model.find(userId)

      if  (user.role) user.role = 0; else user.role = 1

      await user.save()
      
      return {user, message: 'User role successfully modified'}
    }

    Model.deleteUser = async ({response, user}) => {
      console.log('hola')
      if(!user) return response.status(400).json({message:'User not found'})
      await user.delete()
      
      return {message: 'User successfully deleted'}
    }
  }
}
module.exports = ManageUsers
