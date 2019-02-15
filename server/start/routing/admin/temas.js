'use strict'

const Route = use('Route')

Route.group(()=> {
    
    Route.post('/add', 'TemasController.addTema') // Todo .validator('Tema')
    
    Route.delete('/delete/:tema', 'TemasController.deleteTema').bind('Tema')
    
    Route.patch('/edit/:tema', 'TemasController.editTema').bind('Tema')
    
    Route.get('/retrieve/:tema', 'TemasController.tema').bind('Tema')

    Route.get('/', 'TemasController.temas')

}).prefix('api/admin/temas').middleware(['auth', 'admin']).namespace('admin') 