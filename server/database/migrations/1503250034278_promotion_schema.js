'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PromotionSchema extends Schema {
  up () {
    this.create('promotions', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('initialDate').notNullable()
      table.string('endDate').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('promotions')
  }
}

module.exports = PromotionSchema
