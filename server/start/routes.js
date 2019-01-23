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


// Authentication ----------------------------------------

require('./routing/auth/auth')

// Administration ----------------------------------------

require('./routing/admin/students')

require('./routing/admin/promotions')

// Students ----------------------------------------------

require('./routing/student/exercises')


