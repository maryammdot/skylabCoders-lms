class Store {

  constructor(namespace) {
    this.namespace = namespace
    this.TOKEN = this.getToken() || null
    this.USER = this.getUser() || null
  }

  setStorage(obj) {
    localStorage.setItem(this.namespace, JSON.stringify(obj))
    this.TOKEN = this.getToken()
    this.USER = this.getUser()
  }

  getStorage() {
    return JSON.parse(localStorage.getItem(this.namespace))
  }

  deleteStorage() {
    localStorage.removeItem(this.namespace)
  }

  getToken() {
    let { jwt } = this.getStorage() || {}
    return jwt && jwt.token
  }

  getUser() {
    let { user } = this.getStorage() || {}
    return user
  }
  
}

export default new Store('LMS')
