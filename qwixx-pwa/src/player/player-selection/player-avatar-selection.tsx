import { css } from '@emotion/react'
import { responsiveColors } from '../../assets/colors'
import { Label } from '../../controls/ui-elements'
import { Player } from '../../models/game'
import { getRandomIconCode } from '../../utils/avatar-codes'

interface PlayerAvatarSelectionProps {
  player: Player
  onUpdatePlayerData: (playerId: string, newFields: Partial<Player>) => void
}

export function PlayerAvatarSelection({
  player,
  onUpdatePlayerData,
  ...props
}: PlayerAvatarSelectionProps) {
  const { id: playerId } = player
  const buttonID = `${playerId}-avatar`

  function changePlayerAvatar() {
    const avatarCode = getRandomIconCode()
    onUpdatePlayerData(playerId, { avatarCode })
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
    ${responsiveColors.text}
    font-size: 64px;
    font-family: NotoEmoji;
    font-weight: bold;
  `,
  changeButton: css`
    border: none;
  `,
}
