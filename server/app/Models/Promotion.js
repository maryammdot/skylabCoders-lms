'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Promotion extends Model {

    static boot () {
        super.boot()
    
        this.addTrait('admin/Promotion')
    
      }

    static get hidden() {
        return ['created_at', 'updated_at']
    }
    

    users() {
        return this.hasMany('App/Models/User')
    }

}

module.exports = Promotion
