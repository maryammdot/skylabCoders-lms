import axios from "plugins/axios"
import validate from "validators"

export default {

  async getAll() {
    try {
        const {data: {exercises}} = await axios().get('admin/exercises')
        return exercises
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async retrieve({exerciseId}) {
    try {
        const {data: {exercise}} = await axios().get(`admin/exercises/retrieve/${exerciseId}`)
        return exercise
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async updateStatus(postData) {
    try {
        const {data: {message}} = await axios().patch(`admin/exercises/updatestatus/${postData.exerciseId}`, postData)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async correct(postData) {
    try {
        const {data: {message}} = await axios().patch(`admin/exercises/correct/${postData.exerciseId}`, postData)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  }

}
