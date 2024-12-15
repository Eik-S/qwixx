import { css } from '@emotion/react'
import { ChangeEvent } from 'react'
import { colors, darkMode, responsiveColors } from '../../assets/colors'
import { Label } from '../../controls/ui-elements'
import { Player } from '../../models/game'
import { MatchupPlayer } from '../../models/matchup'

interface PlayerNameSelectionProps {
  player: Player
  oldMatchupPlayers: MatchupPlayer[]
  onUpdatePlayerData: (playerId: string, newFields: Partial<Player>) => void
}

export function PlayerNameSelection({
  player,
  oldMatchupPlayers,
  onUpdatePlayerData,
  ...props
}: PlayerNameSelectionProps) {
  const { id: playerId } = player
  const inputID = `${playerId}-name-input`

  function setPlayerName(event: ChangeEvent<HTMLInputElement>) {
    const newName = event.target.value.trim().toUpperCase()
    const sameNameMatchupPlayer = oldMatchupPlayers.find(
      (matchupPlayer) => matchupPlayer.name === newName,
    )

    if (sameNameMatchupPlayer) {
      setPlayerFromMatchupPlayer(sameNameMatchupPlayer)
      return
    }

    onUpdatePlayerData(playerId, { name: newName.length === 0 ? undefined : newName })
  }

  function setPlayerFromMatchupPlayer(matchupPlayer: MatchupPlayer) {
    onUpdatePlayerData(playerId, { name: matchupPlayer.name, avatarCode: matchupPlayer.avatarCode })
  }

  return (
    <div {...props} css={styles.nameSelectionContainer}>
      <Label htmlFor={inputID} text="enter your name" />
      <input
        type="text"
        id={inputID}
        value={player.name ?? ''}
        onChange={setPlayerName}
        css={styles.textInput}
      />
    </div>
  )
}

const styles = {
  nameSelectionContainer: css`
    display: flex;
    flex-direction: column;
    place-items: center;
    row-gap: 12px;
  `,
  textInput: css`
    ${responsiveColors.text}
    border: none;
    border-bottom: 4px solid;
    border-color: ${colors.black};
    ${darkMode} {
      border-color: ${colors.white};
    }
    width: 200px;
    height: 32px;
    text-align: center;
    text-decoration: none;
    background-color: transparent;
    &:focus {
      outline: none;
    }
    font-size: 24px;
    line-height: 36px;
    font-weight: bold;
    padding: 15px 10px;
    letter-spacing: 0.1em;

    text-transform: uppercase;
  `,
}
