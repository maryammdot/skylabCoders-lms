'use strict'

class Login {
  get rules () {
    return {
      email: 'required|email',
      password: 'required|min:6',
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address',
      'email.email': 'You must provide a valid email address',
      'password.required': 'You must provide a password',
      'password.min': 'Password must be of minimum length 6 characters'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(422).send(errorMessages)
  }
}

module.exports = Login
