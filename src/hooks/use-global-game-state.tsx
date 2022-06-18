import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  Board,
  GameData,
  GamePlayingData,
  Line,
  LineColor,
  Player,
  PlayerState,
} from '../models/game'
import { getNewBoard } from '../utils/game-board-factory'
import { getNewPlayer } from '../utils/player-factory'

export type GameStatus = 'running' | 'finished'

type MovingPlayerMoves = Record<LineColor, number[]>
export interface PossibleMoves extends MovingPlayerMoves {
  everyone: number
}
export interface GameStateApi {
  gameData: GameData
  numberOfPlayers: number
  movingPlayerId: string | undefined
  possibleMoves: PossibleMoves | undefined
  setPossibleMoves: Dispatch<SetStateAction<PossibleMoves | undefined>>
  setNextPlayer: () => void
  startNewGame: () => void
  endGame: () => void
  addPlayer: (player: Player) => void
  removePlayer: () => void
  setGameData: Dispatch<SetStateAction<GameData>>
  updatePlayerData: (player: Player) => void
  closeLine: (line: Line) => void
  updatePlayerBoard: (playerId: string, board: Board) => void
  lockMove: (playerId: string) => void
  unlockMove: (playerId: string) => void
}

function useGameState(): GameStateApi {
  const [gameData, setGameData] = useState<GameData>(createEmptyLobby())
  const movingPlayerId = gameData.state === 'playing' ? gameData.movingPlayerId : undefined
  const numberOfClosedLines = gameData.state === 'playing' ? gameData.closedLineColors.length : 0
  const [possibleMoves, setPossibleMoves] = useState<PossibleMoves | undefined>(undefined)

  useEffect(() => {
    if (numberOfClosedLines >= 2) {
      endGame()
    }
  }, [numberOfClosedLines, gameData.state, movingPlayerId])

  function endGame() {
    setGameData((prevGameData: GameData) => {
      return {
        state: 'finished',
        nextMovingPlayerId: prevGameData.players[0].id, //TODO: set to player with smallest score
        winnerPlayerId: prevGameData.players[1].id, //TODO: set to player with highest score
        players: prevGameData.players,
      }
    })
  }

  function addPlayer(player: Player): void {
    setGameData((prevGameData) => ({ ...prevGameData, players: [...prevGameData.players, player] }))
  }

  function removePlayer(): void {
    setGameData((prevGameData) => ({ ...prevGameData, players: prevGameData.players.slice(0, -1) }))
  }

  function setNextPlayer(): void {
    if (gameData.state === 'playing') {
      const lastPlayerIndex = gameData.players
        .map((player) => player.id)
        .indexOf(gameData.movingPlayerId)
      const nextPlayerIndex = (lastPlayerIndex + 1) % gameData.players.length
      const nextMovingPlayerId = gameData.players[nextPlayerIndex].id

      setGameData((prevGameData) => ({
        ...prevGameData,
        movingPlayerId: nextMovingPlayerId,
        players: prevGameData.players.map((prevPlayer) => ({ ...prevPlayer, state: 'moving' })),
      }))
    }
  }

  function updatePlayerData(player: Player): void {
    setGameData((prevGameData) => ({
      ...prevGameData,
      players: prevGameData.players.map((prevPlayer) => {
        if (player.id === prevPlayer.id) {
          return player
        } else {
          return prevPlayer
        }
      }),
    }))
  }

  function startNewGame() {
    if (gameData.state === 'finished' || gameData.state === 'playing') {
      setGameData((): GamePlayingData => {
        return {
          state: 'playing',
          movingPlayerId:
            gameData.state === 'finished' ? gameData.nextMovingPlayerId : gameData.movingPlayerId,
          players: gameData.players.map((player) => ({ ...player, board: getNewBoard() })),
          closedLineColors: [],
        }
      })
    }
    if (gameData.state === 'lobby') {
      setGameData((): GamePlayingData => {
        return {
          state: 'playing',
          movingPlayerId: gameData.players[0].id,
          players: gameData.players,
          closedLineColors: [],
        }
      })
    }
  }

  function createEmptyLobby(): GameData {
    return {
      state: 'lobby',
      players: [getNewPlayer(), getNewPlayer()],
    }
  }

  function closeLine(line: Line): void {
    if (gameData.state === 'playing') {
      setGameData((): GamePlayingData => {
        return {
          ...gameData,
          closedLineColors: [...gameData.closedLineColors, line.color],
        }
      })
    }
  }

  function updatePlayerBoard(playerId: string, board: Board): void {
    setGameData((prevGameData) => {
      return {
        ...prevGameData,
        players: prevGameData.players.map((player) => {
          if (player.id === playerId) {
            return {
              ...player,
              board,
            }
          }
          return player
        }),
      }
    })
  }

  function setPlayerState(playerId: string, state: PlayerState): void {
    setGameData((prevGameData) => {
      return {
        ...prevGameData,
        players: prevGameData.players.map((player) => {
          if (player.id === playerId) {
            return {
              ...player,
              state,
            }
          } else {
            return player
          }
        }),
      }
    })
  }

  return {
    gameData,
    numberOfPlayers: gameData.players.length,
    movingPlayerId,
    possibleMoves,
    setNextPlayer,
    addPlayer,
    removePlayer,
    endGame,
    startNewGame,
    setGameData,
    updatePlayerData,
    closeLine,
    updatePlayerBoard,
    setPossibleMoves,
    lockMove: (playerId: string) => setPlayerState(playerId, 'done'),
    unlockMove: (playerId: string) => setPlayerState(playerId, 'moving'),
  }
}

const GameStateContext = createContext<GameStateApi | undefined>(undefined)

export function GameStateContextProvider({ children }: { children: ReactNode }) {
  const gameState = useGameState()
  return <GameStateContext.Provider value={gameState}>{children}</GameStateContext.Provider>
}

export function useGameStateContext() {
  const context = useContext(GameStateContext)

  if (context === undefined) {
    throw new Error('useGameStateContext must be used within a GameStateContextProvider')
  }

  return context
}
