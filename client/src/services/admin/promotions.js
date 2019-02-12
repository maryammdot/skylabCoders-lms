import axios from "plugins/axios"
import validate from "validators"

export default {

  async getAll() {
    try {
        const {data: {promotions}} = await axios().get('promotions/all')
        return promotions
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async retrieve(promotionId) {
    try {
        const {data: {promotion}} = await axios().get(`promotions/retrieve/${promotionId}`)
        return promotion
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async add(postData) {
    try {
        const {data: {message}} = await axios().post("promotions/add", postData)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async delete(id) {
    try {
        const {data: {message}} = await axios().delete(`promotions/delete/${id}`)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async edit(postData) {
    try {
        const {data: {promotion}} = await axios().patch("promotions/edit", postData)
        return promotion
    } catch (error) {
        throw Error(validate.http(error))
    }
  }

}
