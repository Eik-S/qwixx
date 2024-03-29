import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
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
  MoveTime,
  Player,
  PlayerState,
} from '../models/game'
import { MatchupPlayer } from '../models/matchup'
import { getNewBoard } from '../utils/game-board-factory'
import { getNewPlayer } from '../utils/player-factory'
import { useMatchupContext } from './use-matchup'

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
  isTimeOver: boolean
  setPossibleMoves: Dispatch<SetStateAction<PossibleMoves | undefined>>
  setNextPlayer: () => void
  startNewGame: () => void
  endGame: () => void
  addPlayer: (player: Player) => void
  removePlayer: () => void
  setGameData: Dispatch<SetStateAction<GameData>>
  updatePlayerData: (playerId: string, newFields: Partial<Player>) => void
  closeLine: (line: Line) => void
  updatePlayerBoard: (playerId: string, board: Board) => void
  lockMove: (playerId: string) => void
  unlockMove: (playerId: string) => void
  setMoveTime: (newTime: MoveTime) => void
  setIsTimeOver: Dispatch<SetStateAction<boolean>>
  returnToLobby: () => void
}

function useGameState(): GameStateApi {
  const [gameData, setGameData] = useState<GameData>(createEmptyLobby())
  const { initCurrentMatchup, addWin } = useMatchupContext()
  const movingPlayerId = gameData.state === 'playing' ? gameData.movingPlayerId : undefined
  const numberOfClosedLines = gameData.state === 'playing' ? gameData.closedLineColors.length : 0
  const [possibleMoves, setPossibleMoves] = useState<PossibleMoves | undefined>(undefined)
  const [isTimeOver, setIsTimeOver] = useState(false)

  useEffect(() => {
    if (numberOfClosedLines >= 2) {
      endGame()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfClosedLines, gameData.state, movingPlayerId])

  function endGame() {
    setIsTimeOver(false)
    setGameData((prevGameData: GameData) => {
      const playersSortedByScore = [...prevGameData.players].sort((a, b) => a.score - b.score)
      const looser = playersSortedByScore[0]
      const winner = playersSortedByScore[playersSortedByScore.length - 1]

      addWin(winner.id)

      return {
        ...prevGameData,
        state: 'finished',
        nextMovingPlayerId: looser.id,
        winnerPlayerId: winner.id,
      }
    })
  }

  function returnToLobby() {
    setIsTimeOver(false)
    setGameData((prevGameData: GameData) => {
      return {
        ...prevGameData,
        state: 'lobby',
        nextMovingPlayerId: undefined,
        winnerPlayerId: undefined,
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
    // to not immediately end the next move
    setIsTimeOver(false)

    setGameData((prevGameData) => {
      if (prevGameData.state !== 'playing') {
        throw new Error('Must not set next player when not playing')
      }
      const lastPlayerIndex = prevGameData.players
        .map((player) => player.id)
        .indexOf(prevGameData.movingPlayerId)
      const nextPlayerIndex = (lastPlayerIndex + 1) % prevGameData.players.length
      const nextMovingPlayerId = prevGameData.players[nextPlayerIndex].id
      return {
        ...prevGameData,
        movingPlayerId: nextMovingPlayerId,
        players: prevGameData.players.map((prevPlayer) => ({ ...prevPlayer, state: 'moving' })),
      }
    })
  }

  function updatePlayerData(playerId: string, newFields: Partial<Player>): void {
    const { id } = newFields
    const playerWithSameId = gameData.players.find((player) => player.id === id)
    if (id !== undefined && playerWithSameId) {
      return
    }

    setGameData((prevGameData) => ({
      ...prevGameData,
      players: prevGameData.players.map((prevPlayer) => {
        if (prevPlayer.id === playerId) {
          return { ...prevPlayer, ...newFields }
        } else {
          return prevPlayer
        }
      }),
    }))
  }

  function getRandomPlayer(): Player {
    const randomIndex = Math.floor(Math.random() * gameData.players.length)
    return gameData.players[randomIndex]
  }

  function startNewGame() {
    setGameData((prevGameData): GamePlayingData => {
      return {
        ...prevGameData,
        state: 'playing',
        movingPlayerId:
          gameData.state === 'finished' ? gameData.nextMovingPlayerId : getRandomPlayer().id,
        players: gameData.players.map((player) => ({ ...player, board: getNewBoard() })),
        closedLineColors: [],
      }
    })

    if (gameData.state === 'lobby') {
      saveMatchup()
    }
  }

  function saveMatchup() {
    const matchupPlayers: MatchupPlayer[] = gameData.players.map((player) => {
      return {
        id: player.id,
        name: player.name,
        avatarCode: player.avatarCode,
        wins: 0,
      }
    })

    initCurrentMatchup(matchupPlayers)
  }

  function createEmptyLobby(): GameData {
    return {
      state: 'lobby',
      players: [getNewPlayer(), getNewPlayer()],
      moveTime: 'infinite',
    }
  }

  function closeLine(line: Line): void {
    setGameData((prevGameData) => {
      if (prevGameData.state !== 'playing') {
        throw new Error('Cannot close a line when not playing')
      }
      const lineWasAlreadyClosed = prevGameData.closedLineColors.includes(line.color)
      if (lineWasAlreadyClosed) {
        return prevGameData
      }

      return {
        ...prevGameData,
        closedLineColors: [...prevGameData.closedLineColors, line.color],
      }
    })
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

  function setMoveTime(newTime: MoveTime): void {
    if (gameData.state !== 'lobby') {
      throw new Error('Cannot set moveTime outside of the lobby')
    }
    setGameData((prevGameData) => ({ ...prevGameData, moveTime: newTime }))
  }

  return {
    gameData,
    numberOfPlayers: gameData.players.length,
    movingPlayerId,
    possibleMoves,
    isTimeOver,
    setNextPlayer,
    addPlayer,
    removePlayer,
    endGame,
    startNewGame,
    setGameData,
    updatePlayerData,
    updatePlayerBoard,
    closeLine: useCallback((line: Line) => closeLine(line), []),
    setPossibleMoves,
    lockMove: useCallback((playerId: string) => setPlayerState(playerId, 'done'), []),
    unlockMove: useCallback((playerId: string) => setPlayerState(playerId, 'moving'), []),
    setMoveTime,
    setIsTimeOver,
    returnToLobby,
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
