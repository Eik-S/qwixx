import { App } from '../App'
import { GameStateContextProvider } from '../hooks/use-global-game-state'
import { MatchupContextProvider } from '../hooks/use-matchup'

export default function Home() {
  return (
    <MatchupContextProvider>
      <GameStateContextProvider>
        <App />
      </GameStateContextProvider>
    </MatchupContextProvider>
  )
}
