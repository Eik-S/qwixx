import { GameStatus } from '../hooks/use-global-game-state'
import './game-controls.scss'

export interface GameControlProps {
  areControlsDisabled: boolean
  gameStatus: GameStatus
  onEndTurn: () => void
  startNewGame: () => void
}

export function GameControls({
  gameStatus,
  areControlsDisabled,
  onEndTurn,
  startNewGame,
}: GameControlProps) {
  return (
    <div className="game-controls-area">
      {gameStatus === 'running' ? (
        <button
          className="button end-turn-button"
          onClick={() => onEndTurn()}
          disabled={areControlsDisabled}
        >
          DONE
        </button>
      ) : (
        <button className="button new-game-button" onClick={() => startNewGame()}>
          NEW GAME
        </button>
      )}
    </div>
  )
}
