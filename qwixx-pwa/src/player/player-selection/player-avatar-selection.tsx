import { css } from '@emotion/react'
import { Label } from '../../controls/ui-elements'
import { useGameStateContext } from '../../hooks/use-global-game-state'
import { getRandomIconCode } from '../../utils/avatar-codes'
import { colors } from '../../assets/colors'

export function PlayerAvatarSelection({ playerId, ...props }: { playerId: string }) {
  const { gameData, updatePlayerData } = useGameStateContext()
  const player = gameData.players.find((p) => p.id === playerId)!
  const buttonID = `${playerId}-avatar`

  function changePlayerAvatar() {
    const avatarCode = getRandomIconCode()
    updatePlayerData(playerId, { avatarCode })
  }

  return (
    <div {...props} css={styles.playerIconSelection}>
      <Label htmlFor={buttonID} text="choose your avatar" />
      <button onClick={() => changePlayerAvatar()} id={buttonID} css={styles.avatarButton}>
        <Avatar code={player.avatarCode} />
      </button>
    </div>
  )
}

export function Avatar({ code }: { code: number }) {
  return <span css={styles.avatar}>{String.fromCodePoint(code)}</span>
}

const styles = {
  playerIconSelection: css`
    display: flex;
    flex-direction: column;
    place-items: center;
    row-gap: 12px;
  `,
  avatarButton: css`
    border: none;
    background-color: transparent;
  `,
  avatar: css`
    font-size: 64px;
    font-family: NotoEmoji;
    font-weight: bold;
    color: ${colors.black};
  `,
  changeButton: css`
    border: none;
  `,
}
