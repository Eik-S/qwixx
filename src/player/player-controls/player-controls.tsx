import { css } from '@emotion/react'
import { BigButton } from '../../controls/ui-elements'
import { useGameStateContext } from '../../hooks/use-global-game-state'
import { usePlayerStateContext } from '../../hooks/use-player-game-state'
import { Player } from '../../models/game'

export interface PlayerControlsProps {
  player: Player
}

export function PlayerControls({ player, ...props }: PlayerControlsProps) {
  const { isActivePlayer } = usePlayerStateContext()
  const { gameData, lockMove } = useGameStateContext()
  const moveIsDone = player.state === 'done'
  const playing = gameData.state === 'playing'

  return (
    <div css={styles.playerControlsArea} {...props}>
      {!moveIsDone && playing && isActivePlayer && (
        <DonePassButton
          onClick={() => lockMove(player.id)}
          text={'done'}
          css={styles.playerButton}
        />
      )}
      {!moveIsDone && playing && !isActivePlayer && (
        <DonePassButton
          onClick={() => lockMove(player.id)}
          text={'pass'}
          css={css([styles.passButton, styles.playerButton])}
        />
      )}
    </div>
  )
}

function DonePassButton({ onClick, text, ...props }: { onClick: () => void; text: string }) {
  return <BigButton onClick={onClick} text={text} {...props} />
}

const styles = {
  playerControlsArea: css`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    min-width: 56px;
  `,
  passButton: css`
    border: none;
  `,
  playerButton: css`
    padding: 12px 16px;
    line-height: 30px;
    word-break: break-all;
    white-space: pre-wrap;
    width: 56px;
  `,
}
