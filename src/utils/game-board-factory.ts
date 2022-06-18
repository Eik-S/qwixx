import { Field, Board } from '../models/game'

function createEmptyLineOfFields(order: 'asc' | 'desc'): Field[] {
  const line: Field[] = []
  for (let x = 2; x < 13; x++) {
    line.push({
      value: order === 'asc' ? x : 14 - x,
      status: 'open',
    })
  }
  return line
}

export function getNewBoard(): Board {
  return {
    strikes: 0,
    lines: [
      {
        color: 'r',
        fields: createEmptyLineOfFields('asc'),
        status: 'open',
        wasClosedByYou: false,
      },
      {
        color: 'y',
        fields: createEmptyLineOfFields('asc'),
        status: 'open',
        wasClosedByYou: false,
      },
      {
        color: 'g',
        fields: createEmptyLineOfFields('desc'),
        status: 'open',
        wasClosedByYou: false,
      },
      {
        color: 'b',
        fields: createEmptyLineOfFields('desc'),
        status: 'open',
        wasClosedByYou: false,
      },
    ],
  }
}
