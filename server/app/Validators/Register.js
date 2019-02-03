'use strict'

class Register {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      username: 'required|string|max:20|min:3|string|unique:users,username',
      promotion_id: 'required|number',
      password: 'required|string|min:6|confirmed'
    }
  }

  get messages () {
    return {
      // ......................................................................
      'email.required': 'You must provide a email address',
      'email.email': 'You must provide a valid email address',
      'email.unique': 'Email already registred',
      // ......................................................................
      'username.required': 'You must provide a username',
      'username.string': 'Username must be s string',
      'username.min': 'Password must be of minimum length 3 characters',
      'username.max': 'Password must be of maximum length 20 characters',
      'username.unique': 'Username already taken',
      // ......................................................................
      'promotion_id.required': 'You must provide a promotion id',
      'promotion_id.number': 'Promotion id must be a number',
      // ......................................................................
      'password.required': 'You must provide a password',
      'password.string': 'Password must be a string',
      'password.min': 'Password must be of minimum length 6 characters',
      'password.confirmed': 'Passwords do match'
      // ......................................................................
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(422).send(errorMessages)
  }
}

module.exports = Register
