'use strict'

const Route = use('Route')

Route.group(()=> {

    Route.get('/', 'ExercisesController.exercises')

    Route.patch('/updatestatus/:exercise', 'ExercisesController.updateStatus').bind('Exercise')

    Route.get('/retrieve/:exercise', 'ExercisesController.retrieve').bind('Exercise')
    
    Route.patch('/correct/:exercise', 'ExercisesController.correct').bind('Exercise')

}).prefix('api/admin/exercises').middleware(['auth', 'admin']).namespace('admin') 