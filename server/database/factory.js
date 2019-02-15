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

Factory.blueprint('App/Models/User', (faker, i, custom) => {
  return {
    username: custom.username || faker.username(),
    email: custom.email || faker.email(),
    password: 'secret',
    role: custom.role || 0,
    promotion_id: custom.promotion_id || null,
  }
})

Factory.blueprint('App/Models/Promotion', (faker, i, custom) => {
  return {
    name: custom.name || faker.name(),
    season: custom.season || faker.date({string: true})
  }
})

Factory.blueprint('App/Models/Exercise', async (faker, i, custom) => {
  return {
    title: custom.title || faker.sentence({ words: 4 }),
    code: `<p>${faker.sentence({ words: 10 })}</p>`,
    status: custom.status || 0,
    tema_id: custom.tema_id || null,
    user_id: custom.user_id ||  null
  }
})

Factory.blueprint('App/Models/Tema', (faker, i, custom) => {
  return {
    name: custom.name || faker.name(),
    number: custom.number || faker.integer({ min: 1, max: 7 }),
  }
})

