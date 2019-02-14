import axios from "plugins/axios"
import validate from "validators"

export default {

  async add(postData) {
    try {
        const {data: {message}} = await axios().post("admin/users/register", postData)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async all() {
    try {
        const {data: {users}} = await axios().get('admin/users')
        return users
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async delete({userId}) {
    try {
        const {data: {message}} = await axios().delete(`admin/users/delete/${userId}`)
        return message
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

  async togglePrivileges({userId}) {
    try {
        const {data} = await axios().patch(`admin/users/privileges/${userId}`)
        return data
    } catch (error) {
        throw Error(validate.http(error))
    }
  },

}
