/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'
import { Controls } from './controls/controls'
import { DiceCup } from './dices/dice-cup'
import { LineColor } from './models/game'
import { useGlobalGameState } from './hooks/use-global-game-state'
import { useLocalStorage } from './hooks/use-local-storage'
import { Player } from './player/player'

export function App() {
  const {
    numberOfPlayers,
    activePlayerIndex,
    gameStatus,
    closedLineColors,
    setNextPlayer,
    setNumberOfPlayers,
    addClosedLineColor,
    endGame,
    startNewGame,
  } = useGlobalGameState()
  const [isBig, setIsBig] = useLocalStorage('isBig', false)

  useEffect(() => {
    if (closedLineColors.length >= 2) {
      endGame()
    }
  }, [closedLineColors, endGame])

  function handleNewGameClick() {
    window.location.reload()
  }

  function getGridPosition(playerId: number) {
    if (numberOfPlayers === 2) {
      return playerId === 0 ? 'top' : 'bottom'
    }
    if (numberOfPlayers === 3) {
      return playerId === 0 ? 'top' : playerId === 1 ? 'bottom' : 'left'
    }
    if (numberOfPlayers === 4) {
      return playerId === 0 ? 'top' : playerId === 1 ? 'right' : playerId === 2 ? 'bottom' : 'left'
    }
  }

  return (
    <>
      <div css={styles.content}>
        {[...Array(numberOfPlayers)].map((_player, index) => (
          <Player
            key={index}
            id={index}
            activePlayerIndex={activePlayerIndex}
            numberOfPlayers={numberOfPlayers}
            gridPosition={getGridPosition(index)}
            isActivePlayer={activePlayerIndex === index}
            setNextPlayer={() => setNextPlayer()}
            gameStatus={gameStatus}
            startNewGame={(playerId: number) => startNewGame(playerId)}
            endGame={() => endGame()}
            onCloseLine={(lineColor: LineColor) => addClosedLineColor(lineColor)}
            closedLineColors={closedLineColors}
          />
        ))}

        <div css={styles.dicesArea}>
          {gameStatus === 'running' ? (
            <DiceCup isBig={isBig} activePlayerIndex={activePlayerIndex} />
          ) : null}
        </div>
      </div>
      <Controls
        numOfPlayers={numberOfPlayers}
        onClickNewGame={() => handleNewGameClick()}
        onNumOfPlayersChange={(newValue) => setNumberOfPlayers(newValue)}
        isBig={isBig}
        onChangeIsBig={(newValue) => setIsBig(newValue)}
      />
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
