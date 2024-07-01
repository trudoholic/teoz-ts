import ContextProvider from "./context"
import './App.css'

import Main from "./components/Main"

function App() {
  return (
    <>
      <ContextProvider>
        <Main/>
      </ContextProvider>
    </>
  )
}

export default App
