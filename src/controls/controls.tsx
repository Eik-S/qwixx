import { css } from '@emotion/react'
import { useState } from 'react'
import { colors } from '../assets/colors'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { ControlPane } from './control-pane'

interface ControlsProps {
  isBig: boolean
  onChangeIsBig: (newValue: boolean) => void
}

export function Controls({ isBig, onChangeIsBig }: ControlsProps) {
  const [isControlsPaneOpen, setIsControlsPaneOpen] = useState(false)
  const { numberOfPlayers } = useGameStateContext()

  return (
    <>
      <button
        css={styles.openControlsButton(numberOfPlayers)}
        onClick={() => setIsControlsPaneOpen((prev) => !prev)}
      >
        <span css={styles.buttonIcon}>☰</span>
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
  openControlsButton: (numberOfPlayers: number) => css`
    position: absolute;
    bottom: 0;
    top: 0;
    right: 0px;
    margin-top: auto;
    margin-bottom: auto;
    padding: 0;
    width: 64px;
    height: 64px;
    border: none;
    background-color: transparent;

    ${numberOfPlayers === 4 &&
    css`
      bottom: auto;
      right: 10px;
    `}
  `,
  buttonIcon: css`
    font-family: NotoEmoji;
    font-weight: 700;
    font-size: 46px;
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
    background-color: rgba(255, 255, 255, 0.8);
  `,
  controlPane: css`
    grid-column: 2;
    grid-row: 2;
    background-color: white;
    width: 600px;
    min-height: 200px;
    border: 4px solid ${colors.darkGrey};
  `,
}
