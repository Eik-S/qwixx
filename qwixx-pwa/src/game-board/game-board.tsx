import { useGameStateContext } from '../hooks/use-global-game-state'
import { usePlayerStateContext } from '../hooks/use-player-game-state'
import { GameBoardUi } from './game-board-ui'

export interface GameBoardProps {
  playerId: string
}

export function GameBoard({ playerId, ...props }: GameBoardProps) {
  const { board, isActivePlayer, selections, toggleField } = usePlayerStateContext()
  const { possibleMoves } = useGameStateContext()

  return (
    <GameBoardUi
      playerId={playerId}
      board={board}
      isActivePlayer={isActivePlayer}
      selections={selections}
      possibleMoves={possibleMoves}
      onToggleField={toggleField}
      {...props}
    />
  )
}
