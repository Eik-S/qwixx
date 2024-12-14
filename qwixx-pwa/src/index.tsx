import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { Global, css } from '@emotion/react'
import { colors, responsiveColors } from './assets/colors'

const globalStyles = css`
  @font-face {
    font-family: NotoEmoji;
    src: url('/assets/NotoEmoji-VariableFont_wght.ttf') format('truetype');
    font-weight: 300 700;
    font-style: normal;
    font-display: swap;
  }

  html,
  body,
  #root {
    height: 100%;
    overscroll-behavior: none;
  }

  body {
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    ${responsiveColors.background}
    ${responsiveColors.text}
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

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>,
)
