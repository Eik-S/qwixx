import { Player } from '../models/game'
import { getRandomIconCode } from './avatar-codes'
import { getNewBoard } from './game-board-factory'
import { getRandomAnimalName, getRandomID } from './random-ids'

export function getNewPlayer(): Player {
  const name = getRandomAnimalName()
  const id = `${name}-${getRandomID()}`
  return {
    id: id,
    name: name,
    avatarCode: getRandomIconCode(),
    board: getNewBoard(),
    state: 'moving',
    score: 0,
  }
}
