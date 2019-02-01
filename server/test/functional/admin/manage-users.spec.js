
'use strict'

const { test, trait } = use('Test/Suite')('Manage Users')

const Group = use('App/Models/Promotion')

const Factory = use('Factory')

trait('Test/ApiClient')

trait('Auth/Client')

test('Admin can toggle user privileges', async ({client}) => {

  const admin = await Factory.model('App/Models/User').create({role: 1})

  const user = await Factory.model('App/Models/User').create()

  const resToggleToAdmin = await client.patch(`api/admin/users/privileges/${user.id}`).loginVia(admin).end()

  resToggleToAdmin.assertStatus(200)

  resToggleToAdmin.assertJSONSubset({message: 'User role successfully modified', user: {name: user.name, role: 1}})

  const resToggleToStudent = await client.patch(`api/admin/users/privileges/${user.id}`).loginVia(admin).end()

  resToggleToStudent.assertStatus(200)

  resToggleToStudent.assertJSONSubset({message: 'User role successfully modified', user: {name: user.name, role: 0}})

})

test('Admin can register student and assign it to a promotion', async ({client}) => {

  const admin = await Factory.model('App/Models/User').create({role: 1})

  const promotion = await Factory.model('App/Models/Promotion').create()

  const postData = {
    email:'skylab@coders.com',
    username: 'Skylab Coders',
    password: 'secret',
    password_confirmation: 'secret',
    promotion_id: promotion.id
  }
  
  const res = await client.post('api/admin/users/register').send(postData).loginVia(admin).end()

  res.assertStatus(200)

  res.assertJSONSubset(
    {
      student: {
        email: postData.email,
        username: postData.username,
        promotion_id: promotion.id
      },
      message: 'Student successfully created'
    }
  )

})

test('Admin can delete a user', async ({client}) => {

  const admin = await Factory.model('App/Models/User').create({role: 1})

  const promotion = await Factory.model('App/Models/Promotion').create()

  const student = await Factory.model('App/Models/User').create({promotion_id: promotion.id})

  const res = await client.delete(`api/admin/users/delete/${student.id}`).loginVia(admin).end()

  res.assertStatus(200),

  res.assertJSON({message: 'User successfully deleted'})

})

