import React, { useState, useEffect } from "react"
import styled from "styled-components"

import { getRoles, signUp } from "../api/api"
import { ModalToken } from "../components/ModalToken"
import { LoadingSpinner } from "../components/Spinner"
import { useLoading } from "../contexts/LoadingContext"

export const Form = () => {
  const [roles, setRoles] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [role, setRole] = useState("")
  const [error, setError] = useState<string | undefined>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const { isLoading, setIsLoading } = useLoading()

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true)
      try {
        const roles = await getRoles()
        setRoles(roles)
        setError(undefined)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRoles()
  }, [setIsLoading])

  const clearForm = () => {
    setError(undefined)
    setSubmittedEmail(email)
    setIsModalOpen(true)
    setEmail("")
    setFirstName("")
    setLastName("")
    setRole("")
  }

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault()

    if (role === "Выберите роль") {
      setError("Пожалуйста, выберите роль")
      return
    }

    setIsLoading(true)
    try {
      await signUp({
        last_name: lastName,
        first_name: firstName,
        email: email,
        role: role,
      })
      clearForm()
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      {isLoading && <LoadingSpinner />}
      <SignUpForm onSubmit={handleSignUp}>
        <h1>Авторизация</h1>
        <Input
          type="text"
          placeholder="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Эл. почта"
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
        <SingUpBtn type="submit" value="Зарегистрироваться" />
      </SignUpForm>
      <ModalToken
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        email={submittedEmail}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Input = styled.input`
  margin-bottom: 10px;
  font-size: 16px;
`

const Select = styled.select`
  margin-bottom: 10px;
  font-size: 16px;
`

const SingUpBtn = styled.input`
  cursor: pointer;
  font-size: 16px;
  padding: 10px;

  &:hover {
    filter: brightness(0.9);
  }
`

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`
