import ContextProvider from "./context"
import './App.css'

import Main from "./components/Main"

function App() {
  return (
    <>
      <ContextProvider>
        <h1>Set Count</h1>
        <div className="card">
          <Main/>
        </div>
      </ContextProvider>
    </>
  )
}

export default App
