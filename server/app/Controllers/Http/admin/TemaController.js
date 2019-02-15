'use strict'

const Tema = use('App/Models/Tema')

class TemaController {

    async temas() {
        
        await Tema.temas(...arguments)

    }

    async tema() {
        
        await Tema.tema(...arguments)

    }

    async editTema() {

        await Tema.editTema(...arguments)

    }

    async addTema() {

        await Tema.addTema(...arguments)
        
    }

    async deleteTema() {
        
        await Tema.deleteTema(...arguments)

    }

}

module.exports = TemaController
