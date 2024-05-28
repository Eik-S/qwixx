import { animals } from '../assets/animals'
import { Player } from '../models/game'
import { getRandomIconCode } from './avatar-codes'
import { getNewBoard } from './game-board-factory'

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

function getRandomAnimalName(): string {
  const index = Math.floor(Math.random() * animals.length)
  return animals[index]
}

function getRandomID(): string {
  const unixTime = Date.now()
  const randomFactor = Math.floor(Math.random() * 1000)
  return (unixTime - randomFactor).toString().slice(-5)
}
