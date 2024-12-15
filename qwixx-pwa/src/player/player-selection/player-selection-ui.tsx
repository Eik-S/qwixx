import { css } from '@emotion/react'
import { Player } from '../../models/game'
import { PlayerFromOldMatchupSelection } from './player-from-old-matchup-selection'
import { PlayerAvatarSelection } from './player-avatar-selection'
import { PlayerNameSelection } from './player-name-selection'
import { MatchupPlayer } from '../../models/matchup'

interface PlayerSelectionUiProps {
  player: Player
  oldMatchupPlayers: MatchupPlayer[]
  onUpdatePlayerData: (playerId: string, newFields: Partial<Player>) => void
}
export function PlayerSelectionUi({
  player,
  oldMatchupPlayers,
  onUpdatePlayerData,
  ...props
}: PlayerSelectionUiProps) {
  return (
    <div css={styles.container} {...props}>
      <PlayerNameSelection
        player={player}
        oldMatchupPlayers={oldMatchupPlayers}
        onUpdatePlayerData={onUpdatePlayerData}
      />
      <PlayerAvatarSelection player={player} onUpdatePlayerData={onUpdatePlayerData} />
      <PlayerFromOldMatchupSelection
        player={player}
        oldMatchupPlayers={oldMatchupPlayers}
        onUpdatePlayerData={onUpdatePlayerData}
        css={styles.fromOldMatchupSelection}
      />
    </div>
  )
}

const styles = {
  container: css`
    min-width: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    row-gap: 24px;
    padding-top: 24px;
  `,
  fromOldMatchupSelection: css`
    grid-row: 2;
    grid-column: 1 / span 2;
  `,
}
