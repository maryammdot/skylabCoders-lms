'use strict'

const { test , trait} = use('Test/Suite')('Auth')
const Factory = use('Factory')

trait('Test/ApiClient')

test('user can register and login is automatically done', async ({ assert, client }) => {
  const registerResponse = await client.post('api/auth/register').send({
    email: 'skylab@email.com',
    username: 'skylab',
    password: 'secret',
    password_confirmation: 'secret'
  }).end()
  
  registerResponse.assertStatus(200)
  
  const {jwt} = JSON.parse(registerResponse.text)
  
  assert.equal(jwt.type, 'bearer')
  
  assert.typeOf(jwt.token, 'string')
  
  registerResponse.assertHeader('content-type', 'application/json; charset=utf-8')

  registerResponse.assertJSONSubset({
   user: {
     email:'skylab@email.com',
     username: 'skylab'
   },
   message: 'Logged in successfully'
 })

})

test('user can not register with invalid email', async ({ assert, client }) => {
  const registerResponse = await client.post('api/auth/register').send({
    email: 'skylab',
    username: 'skylab',
    password: 'secret',
    password_confirmation: 'secret'
  }).end()
  
  registerResponse.assertStatus(422)

  registerResponse.assertJSONSubset([{
   message: 'email validation failed on email',
   field: 'email',
   validation: 'email'
 }])

})

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