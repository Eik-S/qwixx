/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useGameStateContext } from '../../hooks/use-global-game-state'
import { usePlayerStateContext } from '../../hooks/use-player-game-state'
import { Player } from '../../models/game'
import { buttonStyles } from '../../utils/button-styles'

export interface PlayerControlsProps {
  player: Player
  narrowLayout: boolean
}

export function PlayerControls({ player, narrowLayout, ...props }: PlayerControlsProps) {
  const { numSelectionsMade, isActivePlayer, addStrike } = usePlayerStateContext()
  const { startNewGame, setNextPlayer, gameData, lockMove, unlockMove } = useGameStateContext()
  const isMoveLocked = player.state === 'done'

  function changeMoveState() {
    if (isMoveLocked) {
      unlockMove(player.id)
    } else {
      lockMove(player.id)
    }
  }
  return (
    <div css={styles.playerControlsArea} {...props}>
      {gameData.state === 'playing' ? (
        <button
          css={styles.doneButton(narrowLayout, isActivePlayer)}
          onClick={() => changeMoveState()}
        >
          {isMoveLocked ? 'fix' : 'done'}
        </button>
      ) : (
        <button
          className="button new-game-button"
          css={styles.doneButton(narrowLayout, isActivePlayer)}
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
  doneButton: (narrowLayout: boolean, isActivePlayer: boolean) => css`
    ${buttonStyles}
    min-width: 160px;
    padding-left: 0;
    padding-right: 0;
    ${narrowLayout &&
    css`
      padding: 12px 16px;
      line-height: 30px;
      word-break: break-all;
      white-space: pre-wrap;
    `}
    ${!isActivePlayer &&
    css`
      border: none;
    `}
  `,
}
