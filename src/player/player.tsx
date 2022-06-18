/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { colors } from '../assets/colors'
import { GameBoard } from '../game-board/game-board'
import { PlayerControls } from './player-controls/player-controls'
import { GameStats } from '../game-stats/game-stats'
import { useGameStateContext } from '../hooks/use-global-game-state'

export interface PlayerProps {
  id: string
  gridPosition: 'top' | 'bottom' | 'left' | 'right' | undefined
}

export function Player({ id, gridPosition }: PlayerProps) {
  const [narrowLayout, setNarrowLayout] = useState(false)
  const { gameData } = useGameStateContext()
  const player = gameData.players.find((player) => player.id === id)!

  useEffect(() => {
    setNarrowLayout(gameData.players.length > 2)
  }, [gameData.players.length])

  return (
    <div css={styles.playerArea(gridPosition, narrowLayout)}>
      <div css={styles.stats(narrowLayout)}>
        <GameStats narrowLayout={narrowLayout} board={player.board} />
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
  playerArea: (
    gridPosition: 'top' | 'bottom' | 'left' | 'right' | undefined,
    narrowLayout: boolean,
  ) => css`
    display: grid;
    grid-template-areas: 'stats board controls';
    grid-template-columns: auto auto auto;
    grid-template-rows: auto;
    grid-column-gap: 18px;
    width: min-content;
    grid-area: ${`player_${gridPosition}`};
    justify-self: center;

    ${narrowLayout &&
    css`
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
      grid-template-areas:
        'stats .'
        'board controls';
    `}
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
