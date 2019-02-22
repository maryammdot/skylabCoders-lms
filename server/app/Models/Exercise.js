'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Exercise extends Model {

    static boot () {
        super.boot()
    
        this.addTrait('student/Exercise')
        this.addTrait('admin/Exercise')

    }

    static get hidden() {
        return ['status']
      }

    static get computed() {
        return ['state']
    }
    
    getState({status}) {
        switch(status) {
            case 1: 
              return 'pending'
            case 2:
              return 'review'
            case 3:
              return 'closed'
        }
    }

    user() {
      return this.belongsTo('App/Models/User')
    }

    tema() {
      return this.belongsTo('App/Models/Tema')
  }
}

module.exports = Exercise
