import { useEffect, useState } from "react"
import styled from "styled-components"

import { getCode, setStatus } from "../api/api"
import { LoadingSpinner } from "../components/Spinner"
import { useLoading } from "../contexts/LoadingContext"
import { encodeToBase64 } from "../utils/base64"

import { Modal } from "./Modal"
import { Token } from "./Token"

interface IModalTokenProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export const ModalToken = ({ isOpen, onClose, email }: IModalTokenProps) => {
  const [token, setToken] = useState("")
  const [showToken, setShowToken] = useState(false)
  const [message, setMessage] = useState<string | undefined>()
  const { isLoading, setIsLoading } = useLoading()

  useEffect(() => {
    const fetchToken = async () => {
      setIsLoading(true)
      try {
        const code = await getCode(email)

        if (!code || typeof code !== "string") {
          throw new Error("Failed to get valid code")
        }

        const encodedToken = encodeToBase64(email, code)

        const statusMessage = await setStatus({
          token: encodedToken,
          status: "increased",
        })

        setToken(code)
        setMessage(statusMessage)
      } catch (error) {
        console.error("Failed to fetch token:", error)
        setMessage("Ошибка при получении токена")
      } finally {
        setIsLoading(false)
      }
    }

    if (isOpen) {
      fetchToken()
    }
  }, [isOpen, email, setIsLoading])

  const toggleShowToken = () => {
    setShowToken((prevState) => !prevState)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ModalContainer>
          <Title>Ваш токен</Title>
          <Text>Эл. почта: {email}</Text>
          <TokenContainer onClick={toggleShowToken}>
            <Text>Токен: </Text>
            <Token token={token} showToken={showToken} />
          </TokenContainer>
          {message && <ErrorMessage>{message}</ErrorMessage>}
        </ModalContainer>
      )}
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

const TokenContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  gap: 5px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const ErrorMessage = styled.p`
  margin: 0;
  color: red;
`
