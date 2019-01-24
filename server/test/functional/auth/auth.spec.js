'use strict'

const { test , trait} = use('Test/Suite')('Auth')
const Factory = use('Factory')

trait('Test/ApiClient')

test('user login with valid credential', async ({ assert, client }) => {

  const {email, username} = await Factory.model('App/Models/User').create()

  const registerResponse = await client.post('api/auth/login').send({
    email,
    password: 'secret',
  }).end()
  
  registerResponse.assertStatus(200)

  const {jwt} = JSON.parse(registerResponse.text)
  
  assert.equal(jwt.type, 'bearer')
  
  assert.typeOf(jwt.token, 'string')
  
  registerResponse.assertHeader('content-type', 'application/json; charset=utf-8')

  registerResponse.assertJSONSubset({
   user: {
     email,
     username
   },
   message: 'Logged in successfully'
 })
})