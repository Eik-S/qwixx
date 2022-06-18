/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { buttonStyles } from '../utils/button-styles'
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

  return (
    <div {...props} css={styles.pane}>
      <h2 css={styles.headline}>Settings</h2>
      <div css={styles.controlsGrid}>
        <label htmlFor="numPayersSlider">Number of PLayers: {gameData.players.length}</label>
        <button onClick={() => handleAddPlayer()} disabled={gameData.players.length >= 4}>
          +
        </button>
        <button onClick={() => removePlayer()} disabled={gameData.players.length <= 2}>
          -
        </button>
        <label htmlFor="isBig">Günter Mode</label>
        <input
          type="checkbox"
          id="isBig"
          checked={isBig}
          onChange={(e) => onChangeIsBig(e.target.checked)}
        />
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
  restartButton: css`
    ${buttonStyles}
    display: inline;
    justify-self: center;
    grid-column: 1 / span 2;
  `,
}
