/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { buttonStyles, smallButtonStyles } from '../utils/button-styles'
import { getNewPlayer } from '../utils/player-factory'

export interface ControlPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  isBig: boolean
  onChangeIsBig: (newValue: boolean) => void
  onStartNewGame: () => void
}

export function ControlPane({ isBig, onChangeIsBig, onStartNewGame, ...props }: ControlPaneProps) {
  const { addPlayer, removePlayer, startNewGame, gameData } = useGameStateContext()

  function handleAddPlayer(): void {
    addPlayer(getNewPlayer())
  }

  function handleStartNewGame(): void {
    startNewGame()
    onStartNewGame()
  }

  function toggleIsBig() {
    onChangeIsBig(!isBig)
  }

  return (
    <div {...props} css={styles.pane}>
      <h2 css={styles.headline}>Settings</h2>
      <div css={styles.controlsGrid}>
        <label htmlFor="numPayersSlider">Number of PLayers: {gameData.players.length}</label>
        <div>
          <button
            css={styles.numPlayersButton}
            onClick={() => removePlayer()}
            disabled={gameData.players.length <= 2}
          >
            -
          </button>
          <button
            css={styles.numPlayersButton}
            onClick={() => handleAddPlayer()}
            disabled={gameData.players.length >= 4}
          >
            +
          </button>
        </div>
        <label htmlFor="isBig">Big Dice</label>
        <button css={styles.checkbox} id="isBig" onClick={() => toggleIsBig()}>
          {isBig ? 'X' : ''}
        </button>
        <button css={styles.restartButton} onClick={() => handleStartNewGame()} className="button">
          new game
        </button>
      </div>
    </div>
  )
}

const styles = {
  pane: css`
    padding: 32px;
  `,
  headline: css`
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 42px;
  `,
  controlsGrid: css`
    display: grid;
    grid-template-columns: auto auto;
    grid-auto-rows: auto;
    justify-content: center;
    grid-column-gap: 46px;
    grid-row-gap: 32px;

    label {
      vertical-align: middle;
      font-size: 16px;
      text-transform: uppercase;
      font-weight: bold;
      line-height: 16px;
      align-self: center;
    }
  `,
  numPlayersButton: css`
    ${smallButtonStyles}
    padding-bottom: 1px;
    width: 48px;
    height: 48px;
    &:first-of-type {
      margin-right: 32px;
    }
  `,
  checkbox: css`
    ${smallButtonStyles}
    width: 48px;
    height: 48px;
  `,
  restartButton: css`
    ${buttonStyles}
    display: inline;
    justify-self: center;
    grid-column: 1 / span 2;
  `,
}
