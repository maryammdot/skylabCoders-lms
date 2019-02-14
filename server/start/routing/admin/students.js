'use strict'

const Route = use('Route')

Route.group(()=> {

    Route.patch('/privileges/:user', 'ManageUsersController.togglePrivileges').bind('User')
    
    Route.post('/register', 'ManageUsersController.addStudent').validator('Register')
    
    Route.delete('/delete/:user', 'ManageUsersController.deleteUser').bind('User')
    
    Route.get('/retrieve/:user', 'ManageUsersController.editUser').bind('user')
      
}).prefix('api/admin/users').middleware(['auth', 'admin']).namespace('admin') 