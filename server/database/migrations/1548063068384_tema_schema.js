'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TemaSchema extends Schema {
  up () {
    this.create('temas', (table) => {
      table.increments()
      table.text('name').notNullable()
      table.integer('number').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('temas')
  }
}

module.exports = TemaSchema
