import axios from "plugins/axios"
import validate from "validators"

export default {

  async add(postData) {
    try {
        const {data: {message}} = await axios().post("students/exercises/add", postData)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async getAll() {
    try {
        const {data: {exercises}} = await axios().get('students/exercises/all')
        return exercises
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async delete({exerciseId}) {
    try {
        const {data: {message}} = await axios().delete(`students/exercises/delete/${exerciseId}`)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async getTemas() {
    try {
        const {data: {temas}} = await axios().get('students/exercises/temas')
        return temas
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async retrieve({exerciseId}) {
    try {
        const {data: {exercise}} = await axios().get(`students/exercises/retrieve/${exerciseId}`)
        return exercise
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async edit(postData) {
    try {
        const {data: {message}} = await axios().patch(`students/exercises/edit/${postData.exerciseId}`, postData)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  }

}
