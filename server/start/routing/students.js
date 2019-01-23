'use strict'

const Route = use('Route')

Route.group(()=> {

    Route.get('/exercises', 'StudentInfoController.getExercises')
    
}).prefix('api/students').middleware(['auth']).namespace('student')