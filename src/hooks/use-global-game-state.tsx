import { useEffect, useState } from 'react'
import { LineColor } from '../game-board/game-board'
import { useLocalStorage } from './use-local-storage'

export type GameStatus = 'running' | 'finished'

export function useGlobalGameState() {
  const [numberOfPlayers, setNumberOfPlayers] = useLocalStorage('numberOfPlayers', 4)
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
    setClosedLineColors((prev) => {
      if (prev.includes(lineColor)) {
        return prev
      } else {
        return [...prev, lineColor]
      }
    })
  }

  function endGame() {
    setGameStatus('finished')
  }

  function startNewGame(playerId: number) {
    setClosedLineColors([])
    setGameStatus('running')
    setActivePlayerIndex(playerId)
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
    setNumberOfPlayers,
  }
}
