import axios, { AxiosError } from "axios"

const api = axios.create({
  baseURL: "http://193.19.100.32:7000",
})

const handleError = (error: AxiosError) => {
  console.error("API error:", error)
  throw error
}

export const getRoles = async () => {
  try {
    const response = await api.get("/api/get-roles")
    return response.data.roles
  } catch (error) {
    handleError(error as AxiosError)
  }
}

export const signUp = async (data: {
  last_name: string
  first_name: string
  email: string
  role: string
}) => {
  try {
    await api.post("/api/sign-up", data)
  } catch (error) {
    handleError(error as AxiosError)
  }
}

export const getCode = async (email: string) => {
  const response = await api.get(`/api/get-code?email=${email}`)
  return response.data
}

export const setStatus = async (data: { token: string; status: string }) => {
  try {
    const response = await api.post("/api/set-status", data)
    return response.data
  } catch (error) {
    handleError(error as AxiosError)
  }
}

export default api
