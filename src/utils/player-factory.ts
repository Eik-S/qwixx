import humanId from 'human-id'
import { Player } from '../models/game'
import { getRandomIconCode } from './avatar-codes'
import { getNewBoard } from './game-board-factory'

export function getNewPlayer(): Player {
  return {
    id: humanId('-'),
    name: humanId('-').split('-')[1],
    avatarCode: getRandomIconCode(),
    board: getNewBoard(),
    state: 'moving',
    score: 0,
  }
}
