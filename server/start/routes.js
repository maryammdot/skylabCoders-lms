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

  Route.post('/privileges', 'admin/UserPrivilegesController.setPrivileges')
  
  Route.delete('/privileges', 'admin/UserPrivilegesController.unsetPrivileges')

}).prefix('api').middleware(['auth', 'admin'])