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

  Route.post('/auth/register', 'AuthController.register').validator('Register')
  
  Route.post('/auth/login', 'AuthController.login').validator('Login')

}).prefix('api').namespace('auth')


Route.group(()=> {

  Route.patch('/privileges/:user', 'ManageUsersController.togglePrivileges').bind('User')
  
  Route.delete('/:user', 'ManageUsersController.deleteUser').bind('User')
  
}).prefix('api/user').middleware(['auth', 'admin']).namespace('admin')

Route.group(()=> {
  
  Route.post('/exercises', 'ExerciseCRUDController.add')

  Route.get('/exercises/:exercise', 'ExerciseCRUDController.get').bind('Exercise').middleware(['exerciseOwner'])

  Route.patch('/exercises/:exercise', 'ExerciseCRUDController.update').bind('Exercise').middleware(['exerciseOwner'])

  Route.delete('/exercises/:exercise', 'ExerciseCRUDController.remove').bind('Exercise').middleware(['exerciseOwner'])
  
}).prefix('api').middleware(['auth']).namespace('student')

Route.group(()=> {

  Route.get('/exercises', 'StudentInfoController.getExercises')
  
}).prefix('api/students').middleware(['auth']).namespace('student')

