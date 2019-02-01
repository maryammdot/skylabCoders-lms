'use strict'

const { test , trait} = use('Test/Suite')('Auth - Login')

const Factory = use('Factory')

trait('Test/ApiClient')

/*
  Success Cases -----------------------------------------------------------------------
*/


test('User can login with valid credential', async ({ assert, client }) => {

  const {email, username} = await Factory.model('App/Models/User').create()

  const res = await client.post('api/auth/login').send({email, password: 'secret'}).end()
  
  res.assertStatus(200)

  const {jwt} = JSON.parse(res.text)
  
  assert.equal(jwt.type, 'bearer')
  
  assert.typeOf(jwt.token, 'string')
  
  res.assertHeader('content-type', 'application/json; charset=utf-8')

  res.assertJSONSubset({user: {email, username}, message: 'Logged in successfully'})
})


/*
  Possible Fail Cases  -----------------------------------------------------------------------
*/


test('Should fail on incorrect password', async ({ client }) => {

  const {email} = await Factory.model('App/Models/User').create()

  const res = await client.post('api/auth/login').send({email, password: 'wrong password'}).end()
  
  res.assertStatus(401)

  res.assertJSON([{field: 'password', message: 'Invalid user password'}])

})


test('Should fail on unregistered email', async ({ client }) => {

  const res = await client.post('api/auth/login').send({email: 'unregistered@gmail.com', password: 'secret'}).end()
  
  res.assertStatus(401)

  res.assertJSON([{field: 'email', message: 'Cannot find user with provided email'}])

})


test('Should fail on undefined email', async ({ client }) => {

  const res = await client.post('api/auth/login').send().end()
  
  res.assertStatus(422)

  res.assertJSON([{field: 'email', message: 'You must provide a email address', validation: 'required'}])

})

test('Should fail on invalid email', async ({ client }) => {

  const res = await client.post('api/auth/login').send({email: 'invalidEmail'}).end()
  
  res.assertStatus(422)

  res.assertJSON([{field: 'email', message: 'You must provide a valid email address', validation: 'email'}])

})

test('Should fail on undefined password', async ({ client }) => {

  const res = await client.post('api/auth/login').send({email: 'lorem@gmail.com'}).end()
  
  res.assertStatus(422)

  res.assertJSON([{field: 'password', message: 'You must provide a password', validation: 'required'}])

})

test('Should fail on invalid min', async ({ client }) => {

  const res = await client.post('api/auth/login').send({email: 'lorem@gmail.com', password: '123'}).end()
  
  res.assertStatus(422)

  res.assertJSON([{field: 'password', message: 'Password must be of minimum length 6 characters', validation: 'min'}])

})