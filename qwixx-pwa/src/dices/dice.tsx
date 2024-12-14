import { css } from '@emotion/react'
import { getHexColor } from '../assets/colors'

export function Dice({
  value,
  color,
  isBig,
}: {
  value: number
  color: 'w' | 'r' | 'y' | 'g' | 'b'
  isBig: boolean
}) {
  return (
    <div css={styles.dice(color, isBig)} style={{ color: color }}>
      {String.fromCharCode(parseInt(`${2679 + value}`, 16))}
    </div>
  )
}

const styles = {
  dice: (color: 'w' | 'r' | 'y' | 'g' | 'b', isBig: boolean) => css`
    font-family: NotoEmoji;
    margin-top: -10px;
    font-size: 80px;
    line-height: 48px;
    margin: 6px 6px 0;
    cursor: pointer;
    ${isBig &&
    css`
      font-size: 150px;
      line-height: 100px;
    `}

    color: ${getHexColor(color, color === 'w' ? 'dark' : undefined)};
    @media (prefers-color-scheme: dark) {
      color: ${getHexColor(color)};
    }
  `,
}
