import { css } from '@emotion/react'
import { useEffect } from 'react'
import { colors } from '../assets/colors'
import { GameBoard } from '../game-board/game-board'
import { PlayerControls } from './player-controls/player-controls'
import { GameStats } from '../game-stats/game-stats'
import { useGameStateContext } from '../hooks/use-global-game-state'
import {
  confetti,
  Color as PartyColor,
  settings as partySettings,
  random as partyRandom,
} from 'party-js'
export interface PlayerProps {
  id: string
}

export function Player({ id, ...props }: PlayerProps) {
  const { gameData } = useGameStateContext()
  const player = gameData.players.find((player) => player.id === id)!
  const narrowLayout = gameData.players.length > 2

  useEffect(() => {
    if (gameData.state === 'finished' && id === gameData.winnerPlayerId) {
      const playerArea = document.getElementById(`player-area-${id}`)
      if (!playerArea) {
        return
      }

      partySettings.gravity = 0
      confetti(playerArea, {
        count: 120,
        spread: 360,
        speed: partyRandom.randomRange(50, 200),
        shapes: 'square',
        color: [
          PartyColor.fromHex(colors.darkRed),
          PartyColor.fromHex(colors.darkGreen),
          PartyColor.fromHex(colors.darkBlue),
          PartyColor.fromHex(colors.darkYellow),
        ],
      })
    }
  }, [gameData, id])

  return (
    <div id={`player-area-${id}`} css={styles.playerArea(narrowLayout)} {...props}>
      <div css={styles.stats(narrowLayout)}>
        <GameStats narrowLayout={narrowLayout} />
      </div>

      <GameBoard playerId={id} css={styles.gameBoard}></GameBoard>

      <PlayerControls
        player={player}
        css={styles.controls}
        narrowLayout={narrowLayout}
      ></PlayerControls>
    </div>
  )
}

const styles = {
  playerArea: (narrowLayout: boolean) => css`
    display: grid;
    grid-template-areas: 'stats board controls';
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    grid-column-gap: 18px;

    ${narrowLayout &&
    css`
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
      grid-template-areas:
        'stats .'
        'board controls';
    `}
  `,
  gameBoard: css`
    grid-area: board;
  `,
  stats: (narrowLayout: boolean) => css`
    grid-area: stats;
    border-right: 4px solid ${colors.grey};
    margin: -6px 0;
    padding: 6px 18px 6px 0;

    ${narrowLayout &&
    css`
      border: none;
      margin: 0;
    `}
  `,
  controls: css`
    grid-area: controls;
  `,
}
