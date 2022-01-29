import { useEffect, useState } from 'react'
import { LineColor } from '../game-board/game-board'

export type GameStatus = 'running' | 'finished'

export function useGlobalGameState() {
  const [numberOfPlayers] = useState(2)
  const [activePlayerIndex, setActivePlayerIndex] = useState(numberOfPlayers - 1)
  const [gameStatus, setGameStatus] = useState<GameStatus>('running')
  const [closedLineColors, setClosedLineColors] = useState<LineColor[]>([])

  useEffect(() => {
    if (closedLineColors.length === 2) {
      endGame()
    }
  }, [closedLineColors])

  function setNextPlayer(): void {
    setActivePlayerIndex((i) => (i + 1) % numberOfPlayers)
  }

  function addClosedLineColor(lineColor: LineColor): void {
    if (closedLineColors.includes(lineColor)) {
      return
    }

    setClosedLineColors((prev) => [...prev, lineColor])
  }

  function endGame() {
    setGameStatus('finished')
  }

  function startNewGame() {
    setClosedLineColors([])
    setGameStatus('running')
  }

  return {
    numberOfPlayers,
    activePlayerIndex,
    gameStatus,
    closedLineColors,
    setNextPlayer,
    addClosedLineColor,
    endGame,
    startNewGame,
  }
}
