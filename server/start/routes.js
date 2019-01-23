'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.group(()=> {
  
  Route.post('/auth/login', 'AuthController.login').validator('Login')

}).prefix('api').namespace('auth')


Route.group(()=> {

  Route.post('/register', 'ManageUsersController.addStudent').validator('Register')

  Route.patch('/privileges/:user', 'ManageUsersController.togglePrivileges').bind('User')
  
  Route.delete('/:user', 'ManageUsersController.deleteUser').bind('User')

  Route.delete('/:user', 'ManageUsersController.deleteUser').bind('User')
  
}).prefix('api/user').middleware(['auth', 'admin']).namespace('admin')

Route.group(()=> {

  Route.get('/users/:promotion', 'PromotionsController.getUsers').bind('Promotion')

  Route.get('/all', 'PromotionsController.promotions')

  Route.get('/:promotion', 'PromotionsController.promotion').bind('Promotion')

  Route.patch('/:promotion', 'PromotionsController.editPromotion').bind('Promotion')
  
}).prefix('api/promotion').middleware(['auth', 'admin']).namespace('admin')

Route.group(()=> {
  
  Route.post('/', 'ExerciseCRUDController.add')

  Route.get('/:exercise', 'ExerciseCRUDController.get').bind('Exercise').middleware(['exerciseOwner'])

  Route.patch('/:exercise', 'ExerciseCRUDController.update').bind('Exercise').middleware(['exerciseOwner'])

  Route.delete('/:exercise', 'ExerciseCRUDController.remove').bind('Exercise').middleware(['exerciseOwner'])
  
}).prefix('api/exercises').middleware(['auth']).namespace('student')


Route.group(()=> {

  Route.get('/exercises', 'StudentInfoController.getExercises')
  
}).prefix('api/students').middleware(['auth']).namespace('student')

