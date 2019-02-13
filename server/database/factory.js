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
    season: data.season ? data.season : faker.date({string: true})
  }
})

Factory.blueprint('App/Models/Exercise', async (faker, i, data) => {
  return {
    title: data.title ? data.title : faker.sentence({ words: 4 }),
    theme: data.theme ? data.theme : faker.integer({ min: 0, max: 8 }),
    code: `<p>${faker.sentence({ words: 10 })}</p>`,
    status: data.status ? data.status : 0,
    user_id: data.user_id ? data.user_id : null
  }
})

