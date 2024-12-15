import { css } from '@emotion/react'
import { Controls } from '../controls/controls'
import { DiceCup } from '../dices/dice-cup'
import { BackgroundEffects } from '../effects/background-effects'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { useLocalStorage } from '../hooks/use-local-storage'
import { PlayerStateContextProvider } from '../hooks/use-player-game-state'
import { FinishedControls } from '../lobby/finished-controls'
import { LobbyControls } from '../lobby/lobby-controls'
import { Player } from '../player/player'
import { PlayerFinished } from '../player/player-finished.tsx/player-finished'
import { PlayerSelection } from '../player/player-selection/player-selection'

export function Game() {
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
    throw new Error('unreachable state. only 2,3 or 4 playrs are aloud')
  }

  return (
    <>
      <BackgroundEffects css={styles.background} />
      <div css={styles.content}>
        {players.map((player, index) =>
          gameState === 'lobby' ? (
            <PlayerSelection
              key={player.id}
              player={player}
              css={styles.playerArea(getGridPosition(index))}
            />
          ) : (
            <PlayerStateContextProvider key={player.id} player={player}>
              {gameState === 'finished' ? (
                <PlayerFinished css={styles.playerArea(getGridPosition(index))} />
              ) : (
                <Player id={player.id} css={styles.playerArea(getGridPosition(index))} />
              )}
            </PlayerStateContextProvider>
          ),
        )}

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
    height: 100%;
    padding: 24px;

    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'player_left player_top player_right'
      'player_left mid_content player_right'
      'player_left player_bottom player_right';

    @media (orientation: portrait) {
      grid-template-columns: 30% 40% 30%;
      height: 100vh;
    }
  `,
  playerArea: (gridPosition: 'top' | 'bottom' | 'left' | 'right') => css`
    width: min-content;
    grid-area: ${`player_${gridPosition}`};
    justify-self: center;

    ${gridPosition === 'top' &&
    css`
      rotate: 180deg;
    `}
    ${gridPosition === 'left' &&
    css`
      justify-self: center;
      align-self: center;
      transform: rotate(90deg);
    `}
      ${gridPosition === 'right' &&
    css`
      justify-self: center;
      align-self: center;
      rotate: 270deg;
    `};
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
