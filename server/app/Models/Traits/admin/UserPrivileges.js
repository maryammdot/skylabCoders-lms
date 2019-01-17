'use strict'

class UserPrivileges {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)
  
    Model.setPrivileges = async ({request, response}) => {
      const {userId} = request.all()

        const user = await Model.find(userId)

        if (user.role) return response.status(200).send('User already registered as Admin')

        user.role = 1
        
        await user.save()
        
        return user
    }

    Model.unsetPrivileges = async ({request, response}) => {
      const {userId} = request.all()
      
      const user = await Model.find(userId)
      
      if (!user.role) return response.status(200).send('User not registered as Admin')
      
      console.log('hola', user)
      user.role = 0
        
      await user.save()
      console.log(user)
      return {user, message: 'User role successfully modified to Student'}
    }
  
  }
}
module.exports = UserPrivileges
