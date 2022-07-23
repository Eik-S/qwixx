import { css } from '@emotion/react'
import { BigButton } from '../../controls/ui-elements'
import { useGameStateContext } from '../../hooks/use-global-game-state'
import { usePlayerStateContext } from '../../hooks/use-player-game-state'
import { Player } from '../../models/game'

export interface PlayerControlsProps {
  player: Player
  narrowLayout: boolean
}

export function PlayerControls({ player, narrowLayout, ...props }: PlayerControlsProps) {
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
          css={styles.narrowButton(narrowLayout)}
        />
      )}
      {!moveIsDone && playing && !isActivePlayer && (
        <DonePassButton
          onClick={() => lockMove(player.id)}
          text={'pass'}
          css={css([styles.passButton, styles.narrowButton(narrowLayout)])}
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
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    min-width: 160px;
  `,
  passButton: css`
    border: none;
    align-self: flex-start;
  `,
  narrowButton: (narrowLayout: boolean) => css`
    ${narrowLayout &&
    css`
      padding: 12px 16px;
      line-height: 30px;
      word-break: break-all;
      white-space: pre-wrap;
      width: 56px;
    `}
  `,
}
