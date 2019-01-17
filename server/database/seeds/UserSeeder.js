'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {

    await Factory.model('App/Models/User').create({
      email: 'arcoders@gmail.com',
      username: 'Ismael Haytam',
      role: 1
    })

    await Factory.model('App/Models/User').create({
      email: 'maryammdot@gmail.com',
      username: 'Maryam Malek',
      role: 1
    })

    await Factory.model('App/Models/User').createMany(20)
  }
}

module.exports = UserSeeder
