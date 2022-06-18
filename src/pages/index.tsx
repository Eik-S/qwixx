import { App } from '../App'
import { GameStateContextProvider } from '../hooks/use-global-game-state'

export default function Home() {
  return (
    <GameStateContextProvider>
      <App />
    </GameStateContextProvider>
  )
}
