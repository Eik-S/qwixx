import { css } from '@emotion/react'
import { GameBoard } from '../game-board/game-board'
import { GameStats } from '../game-stats/game-stats'
import { useGameStateContext } from '../hooks/use-global-game-state'
import { PlayerControls } from './player-controls/player-controls'

export interface PlayerProps {
  id: string
}

export function Player({ id, ...props }: PlayerProps) {
  const { gameData } = useGameStateContext()
  const player = gameData.players.find((player) => player.id === id)!

  return (
    <div css={styles.playerArea} {...props}>
      <div css={styles.stats}>
        <GameStats />
      </div>

      <GameBoard playerId={id} css={styles.gameBoard}></GameBoard>

      <PlayerControls player={player} css={styles.controls}></PlayerControls>
    </div>
  )
}

const styles = {
  playerArea: css`
    display: grid;
    grid-column-gap: 18px;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-template-areas:
      'stats .'
      'board controls';
  `,
  gameBoard: css`
    grid-area: board;
  `,
  stats: css`
    grid-area: stats;
    margin: 0;
    padding: 6px 18px 6px 0;
  `,
  controls: css`
    grid-area: controls;
  `,
}
