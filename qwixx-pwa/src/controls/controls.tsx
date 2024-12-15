import { css } from '@emotion/react'
import { useState } from 'react'
import { colors, responsiveColors } from '../assets/colors'
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
        aria-label="open game settings"
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
            closeControlPane={() => setIsControlsPaneOpen(false)}
            aria-modal="true"
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
    ${responsiveColors.text}
    font-family: NotoEmoji;
    font-weight: 700;
    font-size: 46px;
    line-height: 30px;
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
    background-color: ${colors.white}dd;
    @media (prefers-color-scheme: dark) {
      background-color: ${colors.black}88;
    }
  `,
  controlPane: css`
    ${responsiveColors.background}
    ${responsiveColors.border}
    border: 4px solid;
    grid-column: 2;
    grid-row: 2;
    width: 600px;
    min-height: 200px;
  `,
}
