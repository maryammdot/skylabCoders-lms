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
    } catch ({ response: { data } }) {
      throw Error(data.pop().message)
    }
  }

  return { login }
})()
