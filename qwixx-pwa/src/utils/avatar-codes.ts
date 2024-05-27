const rangeStart = 0x1f600
const rangeEnd = 0x1f644

export function getRandomIconCode(): number {
  return Math.floor(Math.random() * (rangeEnd - rangeStart)) + rangeStart
}
