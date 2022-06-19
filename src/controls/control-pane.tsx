import { css } from '@emotion/react'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { getNewPlayer } from '../utils/player-factory'
import { BigButton, Checkbox, Label, MinusButton, PlusButton } from './ui-elements'

export interface ControlPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  isBig: boolean
  onChangeIsBig: (newValue: boolean) => void
  onStartNewGame: () => void
}

export function ControlPane({ isBig, onChangeIsBig, onStartNewGame, ...props }: ControlPaneProps) {
  const { addPlayer, removePlayer, startNewGame, gameData, numberOfPlayers } = useGameStateContext()

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

  const changeNumPlayersId = 'change-num-players'
  const toggleBigDiceId = 'toggle-big-dice'

  return (
    <div {...props} css={styles.pane}>
      <h2 css={styles.headline}>Settings</h2>
      <div css={styles.controlsGrid}>
        <Label htmlFor={changeNumPlayersId} text={`Number of PLayers: ${numberOfPlayers}`} />
        <div>
          <MinusButton
            css={styles.minusButton}
            labelId={changeNumPlayersId}
            onClick={() => removePlayer()}
            disabled={gameData.players.length <= 2}
          />
          <PlusButton
            labelId={changeNumPlayersId}
            onClick={() => handleAddPlayer()}
            disabled={gameData.players.length >= 4}
          />
        </div>
        <Label htmlFor={toggleBigDiceId} text="Big Dice" />
        <Checkbox labelId={toggleBigDiceId} checked={isBig} onChange={() => toggleIsBig()} />
        <BigButton
          css={styles.restartButton}
          onClick={() => handleStartNewGame()}
          text="new game"
        />
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
  `,
  minusButton: css`
    margin-right: 32px;
  `,
  restartButton: css`
    justify-self: center;
    grid-column: 1 / span 2;
  `,
}
