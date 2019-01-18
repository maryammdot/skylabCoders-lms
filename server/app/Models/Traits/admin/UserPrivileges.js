'use strict'

class UserPrivileges {
  register (Model) {
  
    Model.togglePrivileges = async ({request}) => {

      const { userId } = request.all()

      const user = await Model.find(userId)

      if  (user.role) user.role = 0; else user.role = 1

      await user.save()
      
      return {user, message: 'User role successfully modified'}

    }
  
  }
}
module.exports = UserPrivileges
