import { createContext, useContext, useEffect, useState } from 'react'
import { Matchup, MatchupPlayer } from '../models/matchup'
import { useLocalStorage } from './use-local-storage'

interface MatchupApi {
  currentMatchup: Matchup | undefined
  initCurrentMatchup: (players: MatchupPlayer[]) => void
  addWin: (playerId: string) => void
  oldMatchupPlayers: MatchupPlayer[]
}

function useMatchup(): MatchupApi {
  const [matchups, setMatchups] = useLocalStorage<Matchup[]>('matchups', [])
  const [oldMatchupPlayers, setOldMatchupPlayers] = useState<MatchupPlayer[]>([])
  const [currentMatchup, setCurrentMatchup] = useState<Matchup | undefined>(undefined)

  // get a unique set of all matchup players
  // already known from old games
  useEffect(() => {
    if (matchups === undefined) {
      return
    }
    const uniqueIds: string[] = []
    const matchupPlayers = matchups
      .map((matchup) => matchup.players)
      .flat()
      .map((player) => ({ ...player, wins: 0 }))
    const uniquePlayers = matchupPlayers.filter((player) => {
      const firstInstanceOfThisPlayerId = !uniqueIds.includes(player.id)
      if (firstInstanceOfThisPlayerId) {
        uniqueIds.push(player.id)
      }
      return firstInstanceOfThisPlayerId
    })
    setOldMatchupPlayers(uniquePlayers)
  }, [matchups])

  // keep currentMatchup up to date with localStorage version on changes
  useEffect(() => {
    if (currentMatchup === undefined) {
      return
    }

    const playerIds = currentMatchup.players.map((player) => player.id)

    setMatchups((oldMatchups) => {
      const exceptCurrentMatchup = oldMatchups.filter((matchup) => !matches(matchup, playerIds))

      return [...exceptCurrentMatchup, currentMatchup]
    })
  }, [currentMatchup, setMatchups])

  function matches(matchup: Matchup, playerIds: string[]) {
    const playersMatch = matchup.players.every((player) => playerIds.includes(player.id))
    const numberOfPlayersMatch = matchup.players.length === playerIds.length
    return playersMatch && numberOfPlayersMatch
  }

  function syncDataFromOldMatchup(newMatchup: Matchup, oldMatchup: Matchup): Matchup {
    const newMatchupPlayers = newMatchup.players.map((player) => {
      const oldPlayer = oldMatchup.players.find((oldPlayer) => oldPlayer.id === player.id)
      if (oldPlayer === undefined) {
        return player
      }
      // add more fields you want to copy from old matchup player
      return { ...player, wins: oldPlayer.wins }
    })
    return { ...newMatchup, players: newMatchupPlayers }
  }

  function initCurrentMatchup(players: MatchupPlayer[]) {
    const newMatchup = { players }
    const playerIds = players.map((player) => player.id)
    const oldMatchup = matchups.find((matchup) => {
      return matches(matchup, playerIds)
    })

    if (oldMatchup) {
      setCurrentMatchup(syncDataFromOldMatchup(newMatchup, oldMatchup))
      return
    }

    setCurrentMatchup(newMatchup)
  }

  function addWin(playerId: string) {
    setCurrentMatchup((prevMatchup) => {
      if (prevMatchup === undefined) {
        throw new Error('No matchup initialized to add win to')
      }
      const newMatchup = { ...prevMatchup }
      const player = newMatchup.players.find((player) => player.id === playerId)
      if (!player) {
        throw Error(`winning player (${playerId}) does not exist in currentMatchup ${prevMatchup}`)
      }
      player.wins++
      return newMatchup
    })
  }

  return { currentMatchup, initCurrentMatchup, addWin, oldMatchupPlayers }
}

const MatchupContext = createContext<MatchupApi | undefined>(undefined)

export function MatchupContextProvider({ children }: { children: React.ReactNode }) {
  const matchup = useMatchup()
  return <MatchupContext.Provider value={matchup}>{children}</MatchupContext.Provider>
}

export function useMatchupContext() {
  const matchup = useContext(MatchupContext)
  if (matchup === undefined) {
    throw new Error('useMatchupContext must be used within a MatchupContextProvider')
  }
  return matchup
}
