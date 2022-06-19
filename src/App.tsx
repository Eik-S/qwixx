import { css } from '@emotion/react'
import { Controls } from './controls/controls'
import { DiceCup } from './dices/dice-cup'
import { useLocalStorage } from './hooks/use-local-storage'
import { Player } from './player/player'
import { useGameStateContext } from './hooks/use-global-game-state'
import { PlayerStateContextProvider } from './hooks/use-player-game-state'
import { LobbyControls } from './lobby/lobby-controls'
import { BackgroundEffects } from './effects/background-effects'
import { FinishedControls } from './lobby/finished-controls'

export function App() {
  const { gameData } = useGameStateContext()
  const players = gameData.players
  const gameState = gameData.state
  const [isBig, setIsBig] = useLocalStorage('isBig', false)

  function getGridPosition(playerId: number) {
    if (players.length === 2) {
      return playerId === 0 ? 'top' : 'bottom'
    }
    if (players.length === 3) {
      return playerId === 0 ? 'top' : playerId === 1 ? 'bottom' : 'left'
    }
    if (players.length === 4) {
      return playerId === 0 ? 'top' : playerId === 1 ? 'right' : playerId === 2 ? 'bottom' : 'left'
    }
  }

  // dont render app on the server to not have
  // flickering content due to unset variables
  // needed by emotion
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <>
      <BackgroundEffects css={styles.background} />
      <div css={styles.content}>
        {players.map((player, index) => (
          <PlayerStateContextProvider key={index} player={player}>
            <Player id={player.id} gridPosition={getGridPosition(index)} />
          </PlayerStateContextProvider>
        ))}
        {gameState === 'playing' && (
          <div css={styles.dicesArea}>
            <DiceCup isBig={isBig} />
          </div>
        )}
        {gameState === 'lobby' && <LobbyControls css={styles.midControls} />}
        {gameState === 'finished' && <FinishedControls css={styles.midControls} />}
      </div>
      <Controls isBig={isBig} onChangeIsBig={(newValue) => setIsBig(newValue)} />
    </>
  )
}

const styles = {
  content: css`
    height: 100vh;
    width: 100vw;
    height: -webkit-fill-available;
    padding: 24px;

    display: grid;
    grid-template-columns: minmax(0, 298px) 1fr minmax(0, 298px);
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'player_left player_top player_right'
      'player_left mid_content player_right'
      'player_left player_bottom player_right';
  `,
  dicesArea: css`
    grid-area: mid_content;
    justify-self: center;
    align-self: center;
  `,
  midControls: css`
    grid-area: mid_content;
    justify-self: center;
    align-self: center;
  `,
  background: css`
    z-index: -1;
  `,
}
