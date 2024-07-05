import axios from "axios"

const api = axios.create({
  baseURL: "http://193.19.100.32:7000",
})

export default api
