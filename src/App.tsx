import React, { useState, useEffect } from "react"
import styled from "styled-components"

import api from "./api/api"

const encodeToBase64 = (email: string, code: string): string => {
  const stringToEncode = `${email}:${code}`
  return btoa(encodeURIComponent(stringToEncode))
}

const App: React.FC = () => {
  const [roles, setRoles] = useState([])
  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await api.get("/api/get-roles")
      setRoles(response.data.roles)
    }

    fetchRoles()
  }, [])

  const signUp = async (event: React.FormEvent) => {
    event.preventDefault()

    if (role === "Выберите роль") {
      setError("Пожалуйста, выберите роль")
      return
    }

    await api.post("/api/sign-up", {
      last_name: lastName,
      first_name: firstName,
      email: email,
      role: role,
    })

    const codeResponse = await api.get(`/api/get-code?email=${email}`)

    const encodedToken = encodeToBase64(email, codeResponse.data.code)

    await api.post("/api/set-status", {
      token: encodedToken,
      status: "increased",
    })

    setToken(encodedToken)
    setError("")
  }

  return (
    <Container>
      <Roles>
        <h2>Roles</h2>
        {roles.map((role, index) => (
          <p key={index}>{role}</p>
        ))}
      </Roles>
      <SignUpForm onSubmit={signUp}>
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Выберите роль</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </Select>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input type="submit" value="Sign Up" />
      </SignUpForm>
      <Token>
        <h2>Token</h2>
        <p>Email: {email}</p>
        <p>Token: {token.replace(/.(?=.{4})/g, "*")}</p>
      </Token>
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Roles = styled.div`
  margin-bottom: 20px;
`

const Token = styled.div`
  margin-bottom: 20px;
`

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Input = styled.input`
  margin-bottom: 10px;
`

const Select = styled.select`
  margin-bottom: 10px;
`

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`
