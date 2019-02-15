"use strict"

const { test, trait, beforeEach } = use("Test/Suite")("Exercises")

const Group = use("App/Models/Promotion")

const Factory = use("Factory")

trait("Test/ApiClient")

trait("Auth/Client")

/*
  BeforeEach -----------------------------------------------------------------------
*/

let student, tema, promotion

beforeEach(async () => {

  tema = await Factory.model("App/Models/Tema").create()

  promotion = await Factory.model("App/Models/Promotion").create()

  student = await Factory.model("App/Models/User").create({
    promotion_id: promotion.id
  })

})

/*
  Success Cases -----------------------------------------------------------------------
*/

test("Student can add a exercise", async ({ client }) => {

  const postData = {
    title: "Connect four game",
    code: "console.log(!!{is: true})",
    tema_id: tema.id,
    user_id: student.id
  }

  const res = await client
    .post("api/students/exercises/add")
    .send(postData)
    .loginVia(student)
    .end()

  res.assertStatus(200)

  res.assertJSONSubset({
    message: "Exercise successfully sent",
    exercise: postData
  })
})

test("Student can retrieve his exercise", async ({ client }) => {

  const exercise = await Factory.model("App/Models/Exercise").create({
    tema_id: tema.id,
    user_id: student.id
  })

  const res = await client
    .get(`api/students/exercises/retrieve/${exercise.id}`)
    .loginVia(student)
    .end()

  res.assertStatus(200)

  res.assertJSONSubset({
    exercise: {
      title: exercise.title,
      code: exercise.code,
      mark: 0,
      tema_id: tema.id,
      user_id: student.id,
      state: "Pending"
    }
  })
})

test("Student can edit his exercise", async ({ client }) => {
  const student = await Factory.model("App/Models/User").create()

  const exercise = await Factory.model("App/Models/Exercise").create({
    user_id: student.id
  })

  const postData = {
    code: '<script>const info = "Adonis is the best"</script>'
  }

  const res = await client
    .patch(`api/students/exercises/edit/${exercise.id}`)
    .send(postData)
    .loginVia(student)
    .end()

  res.assertStatus(200)

  res.assertJSONSubset({
    message: "Exercise successfully modified",
    exercise: {
      title: exercise.title,
      theme: exercise.theme,
      code: postData.code,
      state: "Pending",
      mark: 0
    }
  })
})

test("Student can delete his exercise", async ({ client }) => {
  const student = await Factory.model("App/Models/User").create()

  const exercise = await Factory.model("App/Models/Exercise").create({
    user_id: student.id
  })

  const res = await client
    .delete(`api/students/exercises/delete/${exercise.id}`)
    .loginVia(student)
    .end()

  res.assertStatus(200)

  res.assertJSONSubset({ message: "Exercise successfully deleted" })
})

test("Student can retrieve all his exercises", async ({ client }) => {
  const student = await Factory.model("App/Models/User").create()

  const exercise_arrays = await Factory.model("App/Models/Exercise").create({
    user_id: student.id
  })
  const exercise_objects = await Factory.model("App/Models/Exercise").create({
    user_id: student.id
  })
  const exercise_functions = await Factory.model("App/Models/Exercise").create({
    user_id: student.id
  })

  const res = await client
    .get("api/students/exercises/all")
    .loginVia(student)
    .end()

  res.assertStatus(200)

  res.assertJSONSubset({
    exercises: [
      {
        title: exercise_arrays.title,
        mark: 0,
        state: "Pending"
      },
      {
        title: exercise_objects.title,
        mark: 0,
        state: "Pending"
      },
      {
        title: exercise_functions.title,
        mark: 0,
        state: "Pending"
      }
    ]
  })
})
