import axios from 'axios'
import store from "plugins/store"

export default () => {
    store.refreshToken()
    return axios.create({
        baseURL: 'http://127.0.0.1:3333/api',
        timeout: 3000,
        headers: {
            Authorization: `Bearer ${store.TOKEN}`,
        },
    })
}