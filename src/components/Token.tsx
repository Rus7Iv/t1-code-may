import styled from "styled-components"

interface ITokenProps {
  token: string
  showToken: boolean
}

export const Token = ({ token, showToken }: ITokenProps) => {
  const maskedTokenLength = token.length > 4 ? token.length - 4 : 0
  const maskedToken = showToken
    ? token.slice(0, -4)
    : "*".repeat(maskedTokenLength)

  const handleCopyToken = () => {
    navigator.clipboard
      .writeText(token)
      .then(() => {
        alert("Token copied to clipboard!")
      })
      .catch((err) => {
        console.error("Failed to copy token: ", err)
      })
  }

  return (
    <TokenContainer>
      <InvisibleToken>{token}</InvisibleToken>
      <VisibleTokenContainer>
        <BlurredToken $showToken={showToken}>{maskedToken}</BlurredToken>
        <LastFourDigits>{token.slice(-4)}</LastFourDigits>
      </VisibleTokenContainer>
      <CopyButton onClick={handleCopyToken}>&#x1F4CB;</CopyButton>
    </TokenContainer>
  )
}

const TokenContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-family: "Courier New", Courier, monospace;
`

const InvisibleToken = styled.span`
  visibility: hidden;
  position: absolute;
  font-family: "Courier New", Courier, monospace;
`

const VisibleTokenContainer = styled.div`
  display: flex;
`

const BlurredToken = styled.span<{ $showToken: boolean }>`
  filter: ${({ $showToken }) => ($showToken ? "none" : "blur(10px)")};
  transition: filter 0.3s ease;
  font-family: "Courier New", Courier, monospace;
`

const LastFourDigits = styled.span`
  filter: none;
  opacity: 1;
  transition: opacity 0.3s ease;
  font-family: "Courier New", Courier, monospace;
`

const CopyButton = styled.button`
  margin-left: 5px;
  padding: 4px;
  font-size: 14px;
  cursor: pointer;
  background: white;
  border: none;
  border-radius: 100px;

  &:hover {
    filter: brightness(0.9);
  }
`
