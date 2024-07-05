import { LoadingProvider } from "./contexts/LoadingContext"
import { Form } from "./pages/Form"

const App = () => {
  return (
    <LoadingProvider>
      <Form />
    </LoadingProvider>
  )
}

export default App
