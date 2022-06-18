/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export function Dice({ value, color, isBig }: { value: number; color: string; isBig: boolean }) {
  return (
    <div css={styles.dice(color, isBig)} style={{ color: color }}>
      {String.fromCharCode(parseInt(`${2679 + value}`, 16))}
    </div>
  )
}

const styles = {
  dice: (color: string, isBig: boolean) => css`
    font-family: NotoEmoji;
    margin-top: -10px;
    font-size: 80px;
    line-height: 48px;
    margin: -16px 6px 0;
    cursor: pointer;
    color: ${color};
    ${isBig &&
    css`
      font-size: 180px;
      line-height: 120px;
    `}
  `,
}
