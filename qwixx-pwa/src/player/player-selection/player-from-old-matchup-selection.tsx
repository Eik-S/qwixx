import { css } from '@emotion/react'
import { Button, Label } from '../../controls/ui-elements'
import { Player } from '../../models/game'
import { MatchupPlayer } from '../../models/matchup'

interface PlayerFromOldMatchupSelectionProps {
  player: Player
  oldMatchupPlayers: MatchupPlayer[]
  onUpdatePlayerData: (playerId: string, newFields: Partial<Player>) => void
}

export function PlayerFromOldMatchupSelection({
  player,
  oldMatchupPlayers,
  onUpdatePlayerData,
  ...props
}: PlayerFromOldMatchupSelectionProps) {
  function setPlayerFromMatchupPlayer(matchupPlayer: MatchupPlayer) {
    onUpdatePlayerData(player.id, { ...matchupPlayer })
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
            disabled={oldPlayer.id === player.id}
            text={oldPlayer.name}
            css={styles.smallButton}
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
    column-gap: 8px;
    row-gap: 4px;
    max-height: 104px;
    overflow-y: auto;
  `,
  smallButton: css`
    font-size: 18px;
    letter-spacing: 0.05em;
    padding: 0 8px;
  `,
}
