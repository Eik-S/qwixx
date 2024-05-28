import { Game } from './game/game'
import { GameStateContextProvider } from './hooks/use-global-game-state'
import { MatchupContextProvider } from './hooks/use-matchup'

export function App() {
  return (
    <>
      <MatchupContextProvider>
        <GameStateContextProvider>
          <Game />
        </GameStateContextProvider>
      </MatchupContextProvider>
    </>
  )
}
