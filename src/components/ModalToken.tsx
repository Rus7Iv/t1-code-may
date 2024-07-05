import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { getCode, setStatus } from "../api/api"
import { encodeToBase64 } from "../utils/base64"

import { Modal } from "./Modal"

interface ModalTokenProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export const ModalToken: React.FC<ModalTokenProps> = ({
  isOpen,
  onClose,
  email,
}) => {
  const [token, setToken] = useState("")
  const [message, setMessage] = useState<string | undefined>()

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const code = await getCode(email)

        if (!code || typeof code !== "string") {
          throw new Error("Failed to get valid code")
        }

        const encodedToken = encodeToBase64(email, code)

        console.log("email: ", email)
        console.log("code: ", code)
        console.log("encodedToken: ", encodedToken)

        const statusMessage = await setStatus({
          token: encodedToken,
          status: "increased",
        })

        setToken(code)
        setMessage(statusMessage)
      } catch (error) {
        console.error("Failed to fetch token:", error)
        setMessage("Failed to fetch token")
      }
    }

    if (isOpen) {
      fetchToken()
    }
  }, [isOpen, email])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContainer>
        <Title>Your Token</Title>
        <Text>Email: {email}</Text>
        <Text>Token: {token.replace(/.(?=.{4})/g, "*")}</Text>
        {message && <ErrorMessage>{message}</ErrorMessage>}
      </ModalContainer>
    </Modal>
  )
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Title = styled.h2`
  margin: 0;
`

const Text = styled.p`
  margin: 0;
`

const ErrorMessage = styled.p`
  margin: 0;
  color: red;
`
