'use strict'

const Route = use('Route')

Route.group(()=> {
  
    Route.post('/add', 'ExercisesController.add')

    Route.get('/all', 'StudentsController.getExercises')

    Route.get('/retrieve/:exercise', 'ExercisesController.get').bind('Exercise').middleware(['exerciseOwner'])
    
    Route.patch('/edit/:exercise', 'ExercisesController.update').bind('Exercise').middleware(['exerciseOwner'])
  
    Route.delete('/delete/:exercise', 'ExercisesController.remove').bind('Exercise').middleware(['exerciseOwner'])
    
}).prefix('api/students/exercises').middleware(['auth']).namespace('student') 