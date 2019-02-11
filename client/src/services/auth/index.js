import axios from "plugins/axios"
import store from "plugins/store"
import authValidate from "validators/auth"

export default (() => {
  const login = async postData => {
    try {
      authValidate.login(postData)
    } catch ({ message }) {
      throw Error(message)
    }

    try {
      const {data} = await axios().post("auth/login", postData)
      store.setStorage(data)
    } catch (error) {
      if (error.response) {
        const { response: { data } } = error
        throw Error(data.pop().message)
      }
      if (error.message) throw Error(error.message)
    }
  }

  return { login }
})()
