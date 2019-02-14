import store from "plugins/store"

function http(error) {

  if (error.response) {
    
    const {status, data} = error.response

    switch(status) {
        case 401:
            store.deleteStorage()
            if (data.error) return window.location.reload()
            return data.pop().message
        case 422:
            return data.pop().message
        case 404:
            return data.error.message ? 'Route not found :/' : data.error
        default:
            return 'An error has occurred please try it later'
      }

  }
  return error.message
}

export { http }