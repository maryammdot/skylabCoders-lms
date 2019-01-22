'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return {
    username: data.username ? data.username : faker.username(),
    email: data.email ? data.email : faker.email(),
    password: 'secret',
    role: data.role ? data.role : 0,
    promotion_id: data.promotion_id ? data.promotion_id : null,
  }
})

Factory.blueprint('App/Models/Promotion', (faker, i, data) => {
  return {
    name: data.name ? data.name : faker.name(),
    year: data.year ? data.year : new Date().toISOString().slice(0, 10)
  }
})