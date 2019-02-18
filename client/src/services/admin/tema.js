import axios from "plugins/axios"
import validate from "validators"

export default {

  async getAll() {
    try {
        const {data: {temas}} = await axios().get('admin/temas')
        return temas
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async retrieve({temaId}) {
    try {
        const {data: {tema}} = await axios().get(`admin/temas/retrieve/${temaId}`)
        return tema
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async add(postData) {
    try {
        const {data: {message}} = await axios().post("admin/temas/add", postData)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async delete({temaId}) {
    try {
        const {data: {message}} = await axios().delete(`admin/temas/delete/${temaId}`)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async edit(postData) {
    try {
        const {data} = await axios().patch(`admin/temas/edit/${postData.temaId}`, postData)
        return data
    } catch (error) {
        throw Error(validate.http(error))
    }
  }

}
