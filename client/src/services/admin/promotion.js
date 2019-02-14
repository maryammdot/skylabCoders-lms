import axios from "plugins/axios"
import validate from "validators"

export default {

  async getAll() {
    try {
        const {data: {promotions}} = await axios().get('admin/promotions/all')
        return promotions
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async retrieve({promotionId}) {
    try {
        const {data: {promotion}} = await axios().get(`admin/promotions/retrieve/${promotionId}`)
        return promotion
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async getStudents({promotionId}) {
    try {
        const {data: {students}} = await axios().get(`admin/promotions/students/${promotionId}`)
        return students
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async add(postData) {
    try {
        const {data: {message}} = await axios().post("admin/promotions/add", postData)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async delete({promotionId}) {
    try {
        const {data: {message}} = await axios().delete(`admin/promotions/delete/${promotionId}`)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async edit(postData) {
    try {
        const {data} = await axios().patch(`admin/promotions/edit/${postData.promotionId}`, postData)
        return data
    } catch (error) {
        throw Error(validate.http(error))
    }
  }

}
