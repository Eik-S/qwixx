import { css } from '@emotion/react'
import { Player } from '../../models/game'
import { PlayerFromOldMatchupSelection } from './player-from-old-matchup-selection'
import { PlayerAvatarSelection } from './player-avatar-selection'
import { PlayerNameSelection } from './player-name-selection'

export function PlayerSelection({ player, ...props }: { player: Player }) {
  return (
    <div css={styles.container} {...props}>
      <PlayerNameSelection playerId={player.id} />
      <PlayerAvatarSelection playerId={player.id} />
      <PlayerFromOldMatchupSelection playerId={player.id} css={styles.fromOldMatchupSelection} />
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
  `,
  fromOldMatchupSelection: css`
    grid-row: 2;
    grid-column: 1 / span 2;
  `,
}
