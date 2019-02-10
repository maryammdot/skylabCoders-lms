export default (() => {

  const deleteStorage = () => localStorage.removeItem("LMS")

  const getStorage = () => JSON.parse(localStorage.getItem("LMS"))

  const setStorage = obj => localStorage.setItem("LMS", JSON.stringify(obj))

  const getToken = () => {
    let { jwt } = getStorage()
    return jwt && jwt.token
  }

  const TOKEN = getToken()

  const USER = getStorage() && getStorage().user

  return { TOKEN, USER, deleteStorage, setStorage }
})()
