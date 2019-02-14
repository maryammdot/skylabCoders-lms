'use strict'

const Route = use('Route')

Route.group(()=> {

    Route.get('/all', 'PromotionsController.promotions')

    Route.post('/add', 'PromotionsController.addPromotion')

    Route.get('/students/:promotion', 'PromotionsController.getUsers').bind('Promotion')
    
    Route.get('/retrieve/:promotion', 'PromotionsController.promotion').bind('Promotion')
  
    Route.patch('/edit/:promotion', 'PromotionsController.editPromotion').bind('Promotion')

    Route.delete('/delete/:promotion', 'PromotionsController.deletePromotion').bind('Promotion')

}).prefix('api/admin/promotions').middleware(['auth', 'admin']).namespace('admin')