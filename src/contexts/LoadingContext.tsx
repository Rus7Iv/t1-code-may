import React, { createContext, useContext, useState, ReactNode } from "react"

interface ILoadingContextProps {
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingContext = createContext<ILoadingContextProps | undefined>(
  undefined,
)

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = (): ILoadingContextProps => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
