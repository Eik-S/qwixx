import { css } from '@emotion/react'
import { Button, Label } from '../controls/ui-elements'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { useMatchupContext } from '../hooks/use-matchup'
import { MatchupPlayer } from '../models/matchup'

export function PlayerFromOldMatchupSelection({ playerId, ...props }: { playerId: string }) {
  const { oldMatchupPlayers } = useMatchupContext()
  const { updatePlayerData } = useGameStateContext()

  function setPlayerFromMatchupPlayer(matchupPlayer: MatchupPlayer) {
    updatePlayerData(playerId, { ...matchupPlayer })
  }

  if (oldMatchupPlayers.length === 0) {
    return null
  }

  return (
    <div {...props} css={styles.container}>
      <Label htmlFor="old-player-names" text="or select from history" />

      <div css={styles.oldNamesContainer}>
        {oldMatchupPlayers.map((oldPlayer) => (
          <Button
            key={oldPlayer.id}
            onClick={() => setPlayerFromMatchupPlayer(oldPlayer)}
            text={oldPlayer.name}
          />
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    place-items: center;
    row-gap: 12px;
    position: relative;
  `,
  oldNamesContainer: css`
    display: flex;
    flex-wrap: wrap;
    column-gap: 16px;
    row-gap: 8px;
    max-height: 104px;
    overflow-y: auto;
  `,
}
