'use strict'

const Route = use('Route')

Route.group(()=> {
    
    Route.post('/login', 'AuthController.login').validator('Login')

}).prefix('api/auth').namespace('auth')
