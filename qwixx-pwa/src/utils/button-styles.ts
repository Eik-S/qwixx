import { css } from '@emotion/react'
import { responsiveColors } from '../assets/colors'

const baseButtonStyles = (size: 'small' | 'normal') => css`
  ${responsiveColors.text}
  ${responsiveColors.border}
  border: 4px solid;
  background-color: transparent;
  font-size: 28px;
  padding: 18px 32px;
  font-weight: bold;
  letter-spacing: 0.1em;
  cursor: pointer;
  text-transform: uppercase;

  ${size === 'small' &&
  css`
    padding: 0 10px;
    line-height: 36px;
    letter-spacing: 0em;
  `}

  &:disabled {
    ${responsiveColors.disabledText}
    box-shadow: none;
    cursor: default;
  }
`

export const buttonStyles = baseButtonStyles('normal')
export const smallButtonStyles = baseButtonStyles('small')
