import React, { useEffect, useState } from "react"

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
      <h2>Your Token</h2>
      <p>Email: {email}</p>
      <p>Token: {token.replace(/.(?=.{4})/g, "*")}</p>
    </Modal>
  )
}
