/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { ControlPane } from './control-pane'

interface ControlsProps {
  isBig: boolean
  onChangeIsBig: (newValue: boolean) => void
}

export function Controls({ isBig, onChangeIsBig }: ControlsProps) {
  const [isControlsPaneOpen, setIsControlsPaneOpen] = useState(false)

  return (
    <>
      <button
        css={styles.openControlsButton}
        onClick={() => setIsControlsPaneOpen((prev) => !prev)}
      >
        <span css={styles.buttonIcon}>{String.fromCharCode(parseInt(`${2746}`, 16))}</span>
      </button>
      {isControlsPaneOpen && (
        <div css={styles.controlsPaneGridContainer}>
          <div css={styles.curtain} onClick={() => setIsControlsPaneOpen(false)}></div>
          <ControlPane
            css={styles.controlPane}
            isBig={isBig}
            onChangeIsBig={(newValue) => onChangeIsBig(newValue)}
            onStartNewGame={() => setIsControlsPaneOpen(false)}
          />
        </div>
      )}
    </>
  )
}

const styles = {
  openControlsButton: css`
    position: fixed;
    top: 0px;
    right: 0px;
    padding: 0;
    width: 64px;
    height: 64px;
    border: none;
    background-color: transparent;
  `,
  buttonIcon: css`
    font-size: 64px;
    line-height: 30px;
    color: black;
  `,
  controlsPaneGridContainer: css`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 1fr auto 1fr;
  `,

  curtain: css`
    grid-column: 1 / span 3;
    grid-row: 1 / span 3;
    background-color: rgba(0, 0, 0, 0.3);
  `,
  controlPane: css`
    grid-column: 2;
    grid-row: 2;
    background-color: white;
    width: 600px;
    min-height: 200px;
  `,
}
