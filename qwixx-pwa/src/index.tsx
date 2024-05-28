import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { Global, css } from '@emotion/react'
import { colors } from './assets/colors'

const globalStyles = css`
  @font-face {
    font-family: NotoEmoji;
    src: url('/assets/NotoEmoji-VariableFont_wght.ttf') format('truetype');
    font-weight: 300 700;
    font-style: normal;
    font-display: swap;
  }

  body,
  html {
    position: fixed;
  }

  body {
    margin: 0;
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    color: ${colors.darkGrey};
  }

  *:not(input) {
    box-sizing: border-box;
    user-select: none;
    cursor: default;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>,
)
