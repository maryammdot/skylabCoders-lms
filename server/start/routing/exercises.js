'use strict'

const Route = use('Route')

Route.group(()=> {
  
    Route.post('/add', 'ExerciseCRUDController.add')
    
    Route.get('/retrieve/:exercise', 'ExerciseCRUDController.get').bind('Exercise').middleware(['exerciseOwner'])
    
    Route.patch('/edit/:exercise', 'ExerciseCRUDController.update').bind('Exercise').middleware(['exerciseOwner'])
  
    Route.delete('/delete/:exercise', 'ExerciseCRUDController.remove').bind('Exercise').middleware(['exerciseOwner'])
    
}).prefix('api/exercises').middleware(['auth']).namespace('student')