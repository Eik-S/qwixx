import { animals } from '../assets/animals'

export function getRandomAnimalName(): string {
  const index = Math.floor(Math.random() * animals.length)
  return animals[index]
}

export function getRandomID(): string {
  const unixTime = Date.now()
  const randomFactor = Math.floor(Math.random() * 1000)
  return (unixTime - randomFactor).toString().slice(-7)
}

export function getRandomAnimalIdCombo(): string {
  return `${getRandomAnimalName()}-${getRandomAnimalIdCombo}`
}
