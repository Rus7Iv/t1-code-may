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

  useEffect(() => {
    const fetchToken = async () => {
      const code = await getCode(email)
      const encodedToken = encodeToBase64(email, code)
      await setStatus({
        token: encodedToken,
        status: "increased",
      })
      setToken(encodedToken)
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
