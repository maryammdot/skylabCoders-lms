'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExercisesSchema extends Schema {
  up () {
    this.create('exercises', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.integer('theme').notNullable()
      table.text('code').notNullable()
      table.integer('mark').defaultTo(0)
      table.integer('status').defaultTo(0)
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('exercises')
  }
}

module.exports = ExercisesSchema
