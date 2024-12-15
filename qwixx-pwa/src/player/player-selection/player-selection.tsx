import { useGameStateContext } from '../../hooks/use-global-game-state'
import { useMatchupContext } from '../../hooks/use-matchup'
import { Player } from '../../models/game'
import { PlayerSelectionUi } from './player-selection-ui'

interface PlayerSelectionProps {
  player: Player
}
export function PlayerSelection({ player, ...props }: PlayerSelectionProps) {
  const { updatePlayerData } = useGameStateContext()
  const { oldMatchupPlayers } = useMatchupContext()
  return (
    <PlayerSelectionUi
      player={player}
      oldMatchupPlayers={oldMatchupPlayers}
      onUpdatePlayerData={updatePlayerData}
      {...props}
    />
  )
}
