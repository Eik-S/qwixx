import { dimensions } from '../constants/dimensions'
import { GameBoardContent } from './game-board'

// returns true if the isHovered value changed for a field
// returns false if not
export function hasContentChangedByPointerMovement(
  content: GameBoardContent,
  event: MouseEvent,
): boolean {
  const field = dimensions.getFieldAtPosition(content.lines, event.offsetX, event.offsetY)
  if (field.isHovered) {
    return false
  }
  clearHovers(content)

  field.isHovered = true
  return true
}

function clearHovers(content: GameBoardContent): void {
  content.lines.forEach((line) => {
    line.fields.forEach((field) => {
      field.isHovered = false
    })
  })
  return undefined
}
