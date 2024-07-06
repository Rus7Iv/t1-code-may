import styled from "styled-components"

interface ITokenProps {
  token: string
  showToken: boolean
}

export const Token = ({ token, showToken }: ITokenProps) => {
  return (
    <TokenContainer>
      <BlurredToken showToken={showToken}>{token.slice(0, -4)}</BlurredToken>
      <LastFourDigits showToken={showToken}>{token.slice(-4)}</LastFourDigits>
    </TokenContainer>
  )
}

const TokenContainer = styled.div`
  display: flex;
`

const BlurredToken = styled.span<{ showToken: boolean }>`
  filter: ${({ showToken }) => (showToken ? "none" : "blur(10px)")};
  transition: filter 0.3s ease;
`

const LastFourDigits = styled.span<{ showToken: boolean }>`
  filter: none;
  opacity: 1;
  transition: opacity 0.3s ease;
`
