import { useEffect } from 'react'
import './App.scss'
import { Controls } from './controls/controls'
import { DiceCup } from './dices/dice-cup'
import { LineColor } from './game-board/game-board'
import { useGlobalGameState } from './hooks/use-global-game-state'
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

  useEffect(() => {
    if (closedLineColors.length >= 2) {
      endGame()
    }
  }, [closedLineColors, endGame])

  function handleNewGameClick() {
    window.location.reload()
  }

  return (
    <>
      <div className="content">
        {[...Array(numberOfPlayers)].map((_player, index) => (
          <Player
            key={index}
            id={index}
            isActivePlayer={activePlayerIndex === index}
            setNextPlayer={() => setNextPlayer()}
            gameStatus={gameStatus}
            startNewGame={(playerId: number) => startNewGame(playerId)}
            endGame={() => endGame()}
            onCloseLine={(lineColor: LineColor) => addClosedLineColor(lineColor)}
            closedLineColors={closedLineColors}
          />
        ))}

        <div className="dices-area">
          {gameStatus === 'running' ? <DiceCup activePlayerIndex={activePlayerIndex} /> : null}
        </div>
      </div>
      <Controls
        numOfPlayers={numberOfPlayers}
        onClickNewGame={() => handleNewGameClick()}
        onNumOfPlayersChange={(newValue) => setNumberOfPlayers(newValue)}
      />
    </>
  )
}
