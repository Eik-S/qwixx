import { useMatchupContext } from '../../hooks/use-matchup'
import { usePlayerStateContext } from '../../hooks/use-player-game-state'
import { PlayerFinishedUi } from './player-finished-ui'

export function PlayerFinished({ ...props }) {
  const { player, isWinningPlayer } = usePlayerStateContext()
  const { currentMatchup } = useMatchupContext()

  const numberOfWins = currentMatchup!.players.find(
    (matchupPlayer) => matchupPlayer.id === player.id,
  )!.wins

  return (
    <PlayerFinishedUi
      player={player}
      isWinningPlayer={isWinningPlayer}
      numberOfWins={numberOfWins}
      {...props}
    />
  )
}
