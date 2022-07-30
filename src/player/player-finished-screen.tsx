import { css } from '@emotion/react'
import { colors } from '../assets/colors'
import { useMatchupContext } from '../hooks/use-matchup'
import { usePlayerStateContext } from '../hooks/use-player-game-state'

export function PlayerFinishedScreen({ ...props }) {
  const { isWinningPlayer, player } = usePlayerStateContext()
  const { currentMatchup } = useMatchupContext()

  const numberOfWins = currentMatchup!.players.find(
    (matchupPlayer) => matchupPlayer.id === player.id,
  )!.wins

  return (
    <div {...props} css={styles.crowns(!!isWinningPlayer)}>
      {numberOfWins}
    </div>
  )
}

const styles = {
  crowns: (isWinningPlayer: boolean) => css`
    ${isWinningPlayer &&
    css`
      color: ${colors.yellow};
    `}
  `,
}
