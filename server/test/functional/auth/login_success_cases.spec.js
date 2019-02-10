"use strict"

const { test, trait } = use("Test/Suite")("Auth - Login - Success Cases")

const Factory = use("Factory")

trait("Test/ApiClient")

test("User can login with valid credential", async ({ assert, client }) => {
  
  const { email } = await Factory.model("App/Models/User").create()

  const res = await client
    .post("api/auth/login")
    .send({ email, password: "secret" })
    .end()

  res.assertStatus(200)

  const {
    user,
    jwt: { type, token }
  } = JSON.parse(res.text)

  assert.equal(type, "bearer")
  assert.typeOf(token, "string")
  assert.equal(token.split('.').length, 3)

  res.assertHeader("content-type", "application/json; charset=utf-8")

  res.assertJSON({
    user,
    jwt: { type, token, refreshToken: null },
    message: "Logged in successfully"
  })
})
