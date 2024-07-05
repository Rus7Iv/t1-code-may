import axios from "axios"

const api = axios.create({
  baseURL: "http://193.19.100.32:7000",
})

export const getRoles = async () => {
  const response = await api.get("/api/get-roles")
  return response.data.roles
}

export const signUp = async (data: {
  last_name: string
  first_name: string
  email: string
  role: string
}) => {
  await api.post("/api/sign-up", data)
}

export const getCode = async (email: string) => {
  const response = await api.get(`/api/get-code?email=${email}`)
  return response.data.code
}

export const setStatus = async (data: { token: string; status: string }) => {
  await api.post("/api/set-status", data)
}

export default api
