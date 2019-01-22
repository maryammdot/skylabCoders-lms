'use strict'

class Auth {
  register (Model) {

    Model.login = async ({request, auth}) => {
      const {email, password} = request.all()

        const jwt = await auth.attempt(email, password)

        const user = await Model.getUserBy({
          type: 'email',
          value: email
        })

        const message = 'Logged in successfully'
        
        return {jwt, user, message}
    }

    Model.getUserBy = async ({type, value}) => await Model.query().where(type, value).first()
  }
  
}


module.exports = Auth
