import axios from "plugins/axios"
import store from "plugins/store"
import validate from "validators"

export default (() => {
  const login = async postData => {

    let error = validate.login(postData)
    if (error) throw Error(error)
    
    try {
      const {data} = await axios().post("auth/login", postData)
      store.setStorage(data)
    } catch (error) {
      throw Error(validate.http(error))
    }
    
  }

  return { login }
})()
