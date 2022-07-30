import { css } from '@emotion/react'
import { ChangeEvent } from 'react'
import { Label } from '../../controls/ui-elements'
import { useGameStateContext } from '../../hooks/use-global-game-state'
import { useMatchupContext } from '../../hooks/use-matchup'
import { MatchupPlayer } from '../../models/matchup'

export function PlayerNameSelection({ playerId, ...props }: { playerId: string }) {
  const { gameData, updatePlayerData } = useGameStateContext()
  const { oldMatchupPlayers } = useMatchupContext()
  const player = gameData.players.find((p) => p.id === playerId)!

  function setPlayerName(event: ChangeEvent<HTMLInputElement>) {
    const newName = event.target.value.trim().toUpperCase()
    const sameNameMatchupPlayer = oldMatchupPlayers.find(
      (matchupPlayer) => matchupPlayer.name === newName,
    )

    if (sameNameMatchupPlayer) {
      setPlayerFromMatchupPlayer(sameNameMatchupPlayer)
      return
    }

    updatePlayerData(playerId, { name: newName.length === 0 ? undefined : newName })
  }

  function setPlayerFromMatchupPlayer(matchupPlayer: MatchupPlayer) {
    updatePlayerData(playerId, { name: matchupPlayer.name, avatarCode: matchupPlayer.avatarCode })
  }

  return (
    <div {...props} css={styles.nameSelectionContainer}>
      <Label htmlFor="player-name-input" text="enter your name" />
      <input
        type="text"
        name="player-name-input"
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
    width: 200px;
    border: none;
    border-bottom: 4px solid black;
    height: 32px;
    text-align: center;
    text-decoration: none;
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
