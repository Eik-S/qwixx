import { MatchupPlayer } from '../models/matchup'
import { useGameStateContext } from './use-global-game-state'

export function usePlayerSelection({ playerId, ...props }: { playerId: string }) {
  const { updatePlayerData } = useGameStateContext()

  function setPlayerFromMatchupPlayer(matchupPlayer: MatchupPlayer) {
    updatePlayerData(playerId, {
      name: matchupPlayer.name,
      id: matchupPlayer.id,
    })
  }

  function setPlayerName(name: string) {
    updatePlayerData(playerId, {
      name,
    })
  }

  return {
    setPlayerFromMatchupPlayer,
    setPlayerName,
  }
}
