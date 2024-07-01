import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyles from "./styles/global"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles/>
    <App />
  </React.StrictMode>,
)
