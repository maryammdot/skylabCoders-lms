'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ExerciseOwner {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ exercise, auth, response }, next) {

    if (!exercise) return response.status(404).send({error: 'Exercise not found'})
    
    const {id, role} = await auth.getUser()

    const {user_id} = exercise

    if(role || id === user_id) return await next()

    return response.status(401).send({error: 'Unauthorized'})
  }
}

module.exports = ExerciseOwner
