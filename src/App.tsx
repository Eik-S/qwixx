/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Controls } from './controls/controls'
import { DiceCup } from './dices/dice-cup'
import { useLocalStorage } from './hooks/use-local-storage'
import { Player } from './player/player'
import { useGameStateContext } from './hooks/use-global-game-state'
import { PlayerStateContextProvider } from './hooks/use-player-game-state'

export function App() {
  const { gameData } = useGameStateContext()
  const [isBig, setIsBig] = useLocalStorage('isBig', false)

  function getGridPosition(playerId: number) {
    if (gameData.players.length === 2) {
      return playerId === 0 ? 'top' : 'bottom'
    }
    if (gameData.players.length === 3) {
      return playerId === 0 ? 'top' : playerId === 1 ? 'bottom' : 'left'
    }
    if (gameData.players.length === 4) {
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
      <div css={styles.content}>
        {gameData.players.map((player, index) => (
          <PlayerStateContextProvider key={index} player={player}>
            <Player id={player.id} gridPosition={getGridPosition(index)} />
          </PlayerStateContextProvider>
        ))}

        <div css={styles.dicesArea}>
          <DiceCup isBig={isBig} />
        </div>
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
      'player_left dices player_right'
      'player_left player_bottom player_right';
  `,
  dicesArea: css`
    grid-area: dices;
    justify-self: center;
    align-self: center;
  `,
}
