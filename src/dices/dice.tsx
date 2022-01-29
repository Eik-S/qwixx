import './dice.scss'

export function Dice({ value, color }: { value: number; color: string }) {
  return (
    <div className="dice" style={{ color: color }}>
      {String.fromCharCode(parseInt(`${2679 + value}`, 16))}
    </div>
  )
}
