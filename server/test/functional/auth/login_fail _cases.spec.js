"use strict"

const { test, trait } = use("Test/Suite")("Auth - Login - Fail Cases")

const Factory = use("Factory")

trait("Test/ApiClient")


test("Should fail on unregistered email", async ({ client }) => {
  const res = await client
    .post("api/auth/login")
    .send({ email: "unregistered@gmail.com", password: "secret" })
    .end()

  res.assertStatus(401)

  res.assertError([
    { field: "email", message: "Cannot find user with provided email" }
  ])
})

test("Should fail on undefined email", async ({ client }) => {
  const res = await client
    .post("api/auth/login")
    .send()
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

test("Should fail on invalid email", async ({ client }) => {
  const res = await client
    .post("api/auth/login")
    .send({ email: "invalidEmail" })
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

test("Should fail on undefined password", async ({ client }) => {
  const res = await client
    .post("api/auth/login")
    .send({ email: "lorem@gmail.com" })
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

test("Password should be a string", async ({ client }) => {
  const res = await client
    .post("api/auth/login")
    .send({ email: "lorem@gmail.com", password: [123] })
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


test("Password should fail on invalid min", async ({ client }) => {
  const res = await client
    .post("api/auth/login")
    .send({ email: "lorem@gmail.com", password: "123" })
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

test("Should fail on incorrect password", async ({ client }) => {
  const { email } = await Factory.model("App/Models/User").create()

  const res = await client
    .post("api/auth/login")
    .send({ email, password: "wrong password" })
    .end()

  res.assertStatus(401)

  res.assertError([{ field: "password", message: "Invalid user password" }])
})
