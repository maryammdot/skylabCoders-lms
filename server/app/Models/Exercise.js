'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Exercise extends Model {

    static boot () {
        super.boot()
    
        this.addTrait('student/Exercise')
    }

    static get hidden() {
        return ['status']
      }

    static get computed() {
        return ['state']
    }
    
    getState({status}) {
        switch(status) {
            case 0: 
              return 'Pending'
            case 1:
              return 'In revision'
            case 2:
              return 'Closed'
        }
    }

    user() {
        this.belongsTo('App/Models/User')
    }

    tema() {
      this.belongsTo('App/Models/Tema')
  }
}

module.exports = Exercise
