'use strict'

const { test, trait } = use('Test/Suite')('Temas')

const Factory = use("Factory")

trait("Test/ApiClient")
trait("Auth/Client")

test("Admin can get all Temas", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create({ role: 1 })

  const tema_1 = await Factory.model("App/Models/Tema").create()
  const tema_2 = await Factory.model("App/Models/Tema").create()
  const tema_3 = await Factory.model("App/Models/Tema").create()

  const res = await client
    .get("api/admin/temas/") 
    .loginVia(admin)
    .end()

  res.assertStatus(200)

  res.assertJSONSubset({
    temas: [
      {
        name: tema_1.name,
        number: tema_1.number
      },
      {
        name: tema_2.name,
        number: tema_2.number
      },
      {
        name: tema_3.name,
        number: tema_3.number
      }
    ]
  })
})

test("Admin can create a Tema", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create({ role: 1 })

  const postData = {
    name: "Arrays",
    number: 1
  }

  const res = await client
    .post("api/admin/temas/add") 
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(200)

  res.assertJSONSubset({
    message: `Tema ${postData.name} successfully created`,
    tema: postData
  })
})

test("Admin can edit a tema", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create({ role: 1 })

  const tema = await Factory.model("App/Models/Tema").create()

  const postData = {
    name: "Objects",
    number: 2
  }

  const res = await client
    .patch(`api/admin/temas/edit/${tema.id}`)
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(200),
    res.assertJSONSubset({
      message: "Tema successfully modified",
      tema: postData
    })
})

test("Admin can retrieve a tema", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create({ role: 1 })

  const {id, name, number} = await Factory.model("App/Models/Tema").create()

  const res = await client
    .get(`api/admin/temas/retrieve/${id}`)
    .loginVia(admin)
    .end()

  res.assertJSONSubset({
    tema: { id, name, number }
  })
})

test("Admin can delete a tema", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create({ role: 1 })

  const {id} = await Factory.model("App/Models/Tema").create()

  const res = await client
    .delete(`api/admin/temas/delete/${id}`)
    .loginVia(admin)
    .end()

  res.assertStatus(200),
    res.assertJSON({ message: "Tema successfully deleted" })
})
