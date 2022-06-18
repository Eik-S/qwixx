/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useGameStateContext } from '../../hooks/use-global-game-state'
import { usePlayerStateContext } from '../../hooks/use-player-game-state'

export interface PlayerControlsProps {
  narrowLayout: boolean
}

export function PlayerControls({ narrowLayout, ...props }: PlayerControlsProps) {
  const { numSelectionsMade, isActivePlayer, addStrike } = usePlayerStateContext()
  const { startNewGame, setNextPlayer, gameData } = useGameStateContext()

  function handleEndTurn() {
    if (numSelectionsMade === 0) {
      addStrike()
    }
    setNextPlayer()
  }

  return (
    <div css={styles.playerControlsArea} {...props}>
      {gameData.state === 'playing' ? (
        <button
          className="button end-turn-button"
          css={styles.doneButton(narrowLayout)}
          onClick={() => handleEndTurn()}
          disabled={!isActivePlayer}
        >
          DONE
        </button>
      ) : (
        <button
          className="button new-game-button"
          css={styles.doneButton(narrowLayout)}
          onClick={() => startNewGame()}
        >
          NEW GAME
        </button>
      )}
    </div>
  )
}

const styles = {
  playerControlsArea: css`
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  `,
  doneButton: (narrowLayout: boolean) => css`
    ${narrowLayout &&
    css`
      padding: 12px 16px;
      line-height: 30px;
      word-break: break-all;
      white-space: pre-wrap;
    `}
  `,
}
