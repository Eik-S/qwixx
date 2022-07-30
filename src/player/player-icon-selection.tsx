import { css } from '@emotion/react'
import { Label } from '../controls/ui-elements'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { getRandomIconCode } from '../utils/avatar-codes'

export function PlayerAvatarSelection({ playerId, ...props }: { playerId: string }) {
  const { gameData, updatePlayerData } = useGameStateContext()
  const player = gameData.players.find((p) => p.id === playerId)!

  function changePlayerAvatar() {
    const avatarCode = getRandomIconCode()
    updatePlayerData(playerId, { avatarCode })
  }

  return (
    <div {...props} css={styles.playerIconSelection}>
      <Label htmlFor="generate-random-icon" text="choose your avatar" />
      <button onClick={() => changePlayerAvatar()} id="generate-random-icon" css={styles.avatar}>
        {String.fromCodePoint(player.avatarCode)}
      </button>
    </div>
  )
}

const styles = {
  playerIconSelection: css`
    display: flex;
    flex-direction: column;
    place-items: center;
    row-gap: 12px;
  `,
  avatar: css`
    font-size: 64px;
    font-family: NotoEmoji;
    border: none;
    background-color: transparent;
    font-weight: bold;
  `,
  changeButton: css`
    border: none;
  `,
}
