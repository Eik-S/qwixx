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
      <span css={styles.playerAvatar}>{String.fromCodePoint(player.avatarCode)}</span>

      {!moveIsDone && playing && isActivePlayer && (
        <DonePassButton
          onClick={() => lockMove(player.id)}
          aria-label={`end turn of ${player.name}`}
          text={'done'}
          css={styles.playerButton}
        />
      )}
      {!moveIsDone && playing && !isActivePlayer && (
        <DonePassButton
          onClick={() => lockMove(player.id)}
          aria-label={`skip move of ${player.name}`}
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
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 56px;
  `,
  playerAvatar: css`
    font-family: 'NotoEmoji';
    font-size: 42px;
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
