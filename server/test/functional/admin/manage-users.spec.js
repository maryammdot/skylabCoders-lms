"use strict"

const { test, trait, beforeEach } = use("Test/Suite")("Manage Users")
const Factory = use("Factory")

trait("Test/ApiClient")
trait("Auth/Client")

/*
  BeforeEach -----------------------------------------------------------------------
*/

let admin, promotion, user, student

beforeEach(async () => {

  admin = await Factory.model("App/Models/User").create({ role: 1 })

  user = await Factory.model("App/Models/User").create()

  promotion = await Factory.model("App/Models/Promotion").create()

  student = await Factory.model("App/Models/User").create({
    promotion_id: promotion.id
  })

})

/*
  Success Cases -----------------------------------------------------------------------
*/


test("Admin can toggle user privileges", async ({ client }) => {
  const resToggleToAdmin = await client
    .patch(`api/admin/users/privileges/${user.id}`)
    .loginVia(admin)
    .end()

  resToggleToAdmin.assertStatus(200)

  resToggleToAdmin.assertJSONSubset({
    message: "User role successfully modified",
    user: {
      name: user.name,
      role: 1
    }
  })

  const resToggleToStudent = await client
    .patch(`api/admin/users/privileges/${user.id}`)
    .loginVia(admin)
    .end()

  resToggleToStudent.assertStatus(200)

  resToggleToStudent.assertJSONSubset({
    message: "User role successfully modified",
    user: {
      name: user.name,
      role: 0
    }
  })
})

test("Admin can register student and assign it to a promotion", async ({
  client
}) => {
  const postData = {
    email: "skylab@coders.com",
    username: "Skylab Coders",
    promotion_id: promotion.id,
    password: "secret",
    password_confirmation: "secret"
  }

  const res = await client
    .post("api/admin/users/register")
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(200)

  res.assertJSONSubset({
    user: {
      email: postData.email,
      username: postData.username,
      promotion_id: promotion.id,
      privileges: 'Student'
    },
    message: "Student successfully created"
  })
})

test("Admin can delete a user", async ({ client }) => {

  const res = await client
    .delete(`api/admin/users/delete/${student.id}`)
    .loginVia(admin)
    .end()

  res.assertStatus(200),
    res.assertJSON({ message: "User successfully deleted" })
})

/*
  Possible Fail Cases  -----------------------------------------------------------------------
*/

test("Register student should fail on undefined email", async ({ client }) => {
  const res = await client
    .post("api/admin/users/register")
    .send()
    .loginVia(admin)
    .end()

  res.assertStatus(422)

  res.assertError([
    {
      field: "email",
      message: "You must provide a email address",
      validation: "required"
    }
  ])
})

test("Register student should fail on invalid email", async ({ client }) => {
  const res = await client
    .post("api/admin/users/register")
    .send({ email: "invalidEmail" })
    .loginVia(admin)
    .end()

  res.assertStatus(422)

  res.assertError([
    {
      field: "email",
      message: "You must provide a valid email address",
      validation: "email"
    }
  ])
})

test("Register student - username should be a string", async ({ client }) => {
  const postData = {
    email: "lorem@gmail.com",
    username: ["Arcoders"]
  }

  const res = await client
    .post("api/admin/users/register")
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(422)

  res.assertError([
    {
      field: "username",
      message: "Username must be s string",
      validation: "string"
    }
  ])
})

test("Register student should fail on invalid min", async ({ client }) => {
  const postData = {
    email: "lorem@gmail.com",
    username: "ok"
  }

  const res = await client
    .post("api/admin/users/register")
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(422)

  res.assertError([
    {
      field: "username",
      message: "Password must be of minimum length 3 characters",
      validation: "min"
    }
  ])
})

test("Register student Should fail on invalid max", async ({ client }) => {
  const postData = {
    email: "lorem@gmail.com",
    username: "lorem ipsum dolor set amet"
  }

  const res = await client
    .post("api/admin/users/register")
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(422)

  res.assertError([
    {
      field: "username",
      message: "Password must be of maximum length 20 characters",
      validation: "max"
    }
  ])
})

test("Register student - username most be unique", async ({ client }) => {
  const user = await Factory.model("App/Models/User").create()

  const postData = {
    email: "lorem@gmail.com",
    username: user.username
  }

  const res = await client
    .post("api/admin/users/register")
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(422)

  res.assertError([
    {
      field: "username",
      message: "Username already taken",
      validation: "unique"
    }
  ])
})

test("Register student should fail on undefined promotion id", async ({
  client
}) => {
  const postData = {
    email: "lorem@gmail.com",
    username: "Arcoders"
  }

  const res = await client
    .post("api/admin/users/register")
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(422)

  res.assertError([
    {
      field: "promotion_id",
      message: "You must provide a promotion id",
      validation: "required"
    }
  ])
})

test("Register student should fail on invalid promotion id", async ({
  client
}) => {
  const postData = {
    email: "lorem@gmail.com",
    username: "Arcoders",
    promotion_id: "abcd123"
  }

  const res = await client
    .post("api/admin/users/register")
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(422)

  res.assertError([
    {
      field: "promotion_id",
      message: "Promotion id must be a number",
      validation: "number"
    }
  ])
})

test("Register student should fail on undefined password", async ({
  client
}) => {

  const postData = {
    email: "lorem@gmail.com",
    username: "Arcoders",
    promotion_id: promotion.id
  }

  const res = await client
    .post("api/admin/users/register")
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(422)

  res.assertError([
    {
      field: "password",
      message: "You must provide a password",
      validation: "required"
    }
  ])
})

test("Register student - password should be a string", async ({ client }) => {
  const postData = {
    email: "lorem@gmail.com",
    username: "Arcoders",
    promotion_id: promotion.id,
    password: { pass: "secret" }
  }

  const res = await client
    .post("api/auth/login")
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(422)

  res.assertError([
    {
      field: "password",
      message: "Password must be s string",
      validation: "string"
    }
  ])
})

test("Register student - password should fail on invalid min", async ({
  client
}) => {
  const postData = {
    email: "lorem@gmail.com",
    username: "Arcoders",
    promotion_id: promotion.id,
    password: "abc"
  }

  const res = await client
    .post("api/auth/login")
    .send(postData)
    .loginVia(admin)
    .end()

  res.assertStatus(422)

  res.assertError([
    {
      field: "password",
      message: "Password must be of minimum length 6 characters",
      validation: "min"
    }
  ])
})
