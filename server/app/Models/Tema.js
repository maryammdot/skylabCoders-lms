'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tema extends Model {

    static boot () {
        super.boot()
    
        this.addTrait('admin/Tema')
    }

    exercises() {
        return this.hasMany('App/Models/Exercise')
    }

}

module.exports = Tema
