import React, { useState, useEffect } from "react"
import styled from "styled-components"

import api from "./api/api"
import { ModalToken } from "./components/ModalToken"

const App: React.FC = () => {
  const [roles, setRoles] = useState([])
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

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

    setError("")
    setIsModalOpen(true)
  }

  return (
    <Container>
      <SignUpForm onSubmit={signUp}>
        <h1>Form</h1>
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
      <ModalToken
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={email}
      />
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
