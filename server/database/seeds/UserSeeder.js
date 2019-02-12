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

    let firstPromotion = await Factory.model('App/Models/Promotion').create({
      name: 'Primera',
      initialdate: '06/01/2018',
      endDate: '28/03/2018'
    })
    
    await Factory.model('App/Models/Promotion').create({
      name: 'Segunda',
      initialdate: '06/04/2018',
      endDate: '28/07/2018'
    })

    await Factory.model('App/Models/Promotion').create({
      name: 'Tercera',
      initialdate: '03/09/2018',
      endDate: '3/01/2019'
    })

    await Factory.model('App/Models/User').create({
      email: 'arcoders@gmail.com',
      username: 'Ismael Haytam',
      role: 1,
    })

    await Factory.model('App/Models/User').create({
      email: 'maryammdot@gmail.com',
      username: 'Maryam Malek',
      role: 1,
    })


    await Factory.model('App/Models/User').createMany(20, {promotion_id: firstPromotion.id})

  }
}

module.exports = UserSeeder
