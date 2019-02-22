'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExercisesSchema extends Schema {
  up () {
    this.create('exercises', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.text('code').notNullable()
      table.text('code_admin_correction').notNullable()
      table.integer('mark').defaultTo(0)
      table.integer('status').defaultTo(1)
      table.integer('tema_id').unsigned().references('id').inTable('temas').onDelete('cascade')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('exercises')
  }
}

module.exports = ExercisesSchema
