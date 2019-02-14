'use strict'

class ManageUsers {
  register (Model) {
  
    Model.togglePrivileges = async ({user, response}) => {

      if (user.role) user.role = 0; else user.role = 1

      await user.save()

      !user.role && (user.promotion = await user.promotion().fetch())
      
      return response.status(200).json({user, message: 'User role successfully modified'})

    }

    Model.addUser = async ({request, response}) => {

      const {email, password, username, promotion_id} = request.all()
      
      const user = await Model.create({email, password, username, promotion_id})
      
      return response.status(200).json({user, message: 'Student successfully created'})

    }

    Model.deleteUser = async ({user, response}) => {

      if (!user) return response.status(404).send({error: 'user not found'})

      await user.delete()
      
      return response.status(200).json({message: 'User successfully deleted'})

    }

    Model.allUsers = async ({response}) => {

      const users = await Model.query().with('promotion').fetch()
      
      return response.status(200).json({users})

    }
  
  }
}
module.exports = ManageUsers
