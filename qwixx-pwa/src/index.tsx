import { Global } from '@emotion/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { globalStyles } from './styles/global-styles'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>,
)
