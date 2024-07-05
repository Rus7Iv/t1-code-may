import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"

interface IModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ isOpen, onClose, children }: IModalProps) => {
  const [visible, setVisible] = useState(isOpen)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      setIsClosing(false)
    } else {
      setIsClosing(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setVisible(false)
      onClose()
    }, 300)
  }

  if (!visible && !isOpen) {
    return null
  }

  return (
    <ModalOverlay $isOpen={isOpen && !isClosing} onClick={handleClose}>
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        $isOpen={isOpen && !isClosing}
      >
        <CloseButton onClick={handleClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#333333"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CloseButton>
        {children}
      </ModalContainer>
    </ModalOverlay>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
  }
`

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(227, 227, 227, 0.4);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.3s ease-out
    forwards;
`

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  background: white;
  padding: 20px;
  padding-top: 46px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 0.5px 1.5px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)} 0.3s ease-out
    forwards;
`

const CloseButton = styled.button`
  position: absolute;
  padding: 0;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
