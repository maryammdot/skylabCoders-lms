"use strict"

const { test, trait } = use("Test/Suite")("Promotions")

const Group = use("App/Models/Promotion")

const Factory = use("Factory")

trait("Test/ApiClient")

trait("Auth/Client")

test("Admin can create a promotion", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create({ role: 1 })

  const postData = {
    name: "Primera promoción",
    season: "06/01/2018 - 28/03/2018"
  }

  const res = await client
    .post("api/promotions/add")
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(200)

  res.assertJSONSubset({
    message: `Promotion ${postData.name} successfully created`,
    promotion: postData
  })
})

test("Admin can edit a promotion", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create({ role: 1 })

  const promotion = await Factory.model("App/Models/Promotion").create()

  const postData = { name: "Tercera promoción" }

  const res = await client
    .patch(`api/promotions/edit/${promotion.id}`)
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(200),
    res.assertJSONSubset({
      message: "Promotion successfully modified",
      promotion: { name: postData.name }
    })
})

test("Admin can retrieve a promotion", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create({ role: 1 })

  const promotion = await Factory.model("App/Models/Promotion").create()

  const res = await client
    .get(`api/promotions/retrieve/${promotion.id}`)
    .loginVia(admin)
    .end()

  res.assertJSONSubset({
    promotion: { name: promotion.name, id: promotion.id }
  })
})

test("Admin can delete a promotion", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create({ role: 1 })

  const promotion = await Factory.model("App/Models/Promotion").create()

  const res = await client
    .delete(`api/promotions/delete/${promotion.id}`)
    .loginVia(admin)
    .end()

  res.assertStatus(200),
    res.assertJSON({ message: "Promotion successfully deleted" })
})

test("Admin can get users by promotion", async ({ client }) => {
  const admin = await Factory.model("App/Models/User").create({ role: 1 })

  const promotion = await Factory.model("App/Models/Promotion").create()

  const student_1 = await Factory.model("App/Models/User").create({
    promotion_id: promotion.id
  })

  const student_2 = await Factory.model("App/Models/User").create({
    promotion_id: promotion.id
  })

  const student_3 = await Factory.model("App/Models/User").create({
    promotion_id: promotion.id
  })

  const res = await client
    .get(`api/promotions/students/${promotion.id}`)
    .loginVia(admin)
    .end()

  res.assertStatus(200)

  res.assertJSONSubset({
    students: [
      {
        id: student_1.id,
        username: student_1.username,
        email: student_1.email,
        role: 0,
        priviliges: "Student",
        promotion_id: promotion.id
      },
      {
        id: student_2.id,
        username: student_2.username,
        email: student_2.email,
        role: 0,
        priviliges: "Student",
        promotion_id: promotion.id
      },
      {
        id: student_3.id,
        username: student_3.username,
        email: student_3.email,
        role: 0,
        priviliges: "Student",
        promotion_id: promotion.id
      }
    ]
  })
})
