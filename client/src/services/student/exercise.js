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
  }

}
