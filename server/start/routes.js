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

  Route.post('/auth/register', 'auth/AuthController.register').validator('Register')
  
  Route.post('/auth/login', 'auth/AuthController.login').validator('Login')

}).prefix('api')


Route.group(()=> {

  Route.patch('/privileges/:user', 'admin/ManageUsersController.togglePrivileges').bind('User')
  
  Route.delete('/:user', 'admin/ManageUsersController.deleteUser').bind('User')
  
}).prefix('api/user').middleware(['auth', 'admin'])

Route.group(()=> {

  Route.post('/exercises', 'student/ExerciseCRUDController.add')

  Route.get('/exercises/:exercise', 'student/ExerciseCRUDController.get').bind('Exercise')

  Route.patch('/exercises/:exercise', 'student/ExerciseCRUDController.update').bind('Exercise')

  Route.delete('/exercises/:exercise', 'student/ExerciseCRUDController.remove').bind('Exercise')
  
}).prefix('api').middleware(['auth'])

Route.group(()=> {

  Route.get('/exercises', 'student/StudentInfoController.getExercises')
  
}).prefix('api/students').middleware(['auth'])