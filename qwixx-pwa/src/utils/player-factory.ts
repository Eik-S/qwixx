import { Player } from '../models/game'
import { getRandomIconCode } from './avatar-codes'
import { getNewBoard } from './game-board-factory'
var hri = require('human-readable-ids').hri

export function getNewPlayer(): Player {
  const id = hri.random().toUpperCase()
  return {
    id: id,
    name: id.split('-')[1],
    avatarCode: getRandomIconCode(),
    board: getNewBoard(),
    state: 'moving',
    score: 0,
  }
}
