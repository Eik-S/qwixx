import humanId from 'human-id'
import { Player } from '../models/game'
import { getNewBoard } from './game-board-factory'

export function getNewPlayer(): Player {
  return {
    id: humanId('-'),
    name: humanId('-').split('-')[1],
    board: getNewBoard(),
    state: 'moving',
    score: 0,
  }
}
