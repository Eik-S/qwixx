import { css } from '@emotion/react'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { getNewPlayer } from '../utils/player-factory'
import { BigButton, Checkbox, Label, MinusButton, PlusButton } from './ui-elements'

export interface ControlPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  isBig: boolean
  onChangeIsBig: (newValue: boolean) => void
  closeControlPane: () => void
}

export function ControlPane({
  isBig,
  onChangeIsBig,
  closeControlPane,
  ...props
}: ControlPaneProps) {
  const { addPlayer, removePlayer, startNewGame, returnToLobby, gameData, numberOfPlayers } =
    useGameStateContext()

  function handleAddPlayer(): void {
    addPlayer(getNewPlayer())
  }

  function handleStartNewGame(): void {
    startNewGame()
    closeControlPane()
  }

  function handleBackToLobbyClick(): void {
    returnToLobby()
    closeControlPane()
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
        <div css={styles.buttons}>
          <BigButton onClick={() => handleStartNewGame()} text="new game" />
          <BigButton onClick={() => handleBackToLobbyClick()} text="lobby" />
        </div>
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
  buttons: css`
    grid-column: 1 / span 2;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 16px;
  `,
}
