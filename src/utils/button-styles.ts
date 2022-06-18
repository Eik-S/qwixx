import { css } from '@emotion/react'
import { colors } from '../assets/colors'

const baseButtonStyles = (size: 'small' | 'normal') => css`
  border: 4px solid ${colors.darkGrey};
  background-color: transparent;
  color: black;
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

  &:hover {
    box-shadow: 0 0 6px 0px $grey;
  }
  &:active {
    box-shadow: inset 0 0 6px 0px $grey;
  }
  &:disabled {
    box-shadow: none;
    color: ${colors.lightGrey};
    border-color: ${colors.lightGrey};
    cursor: default;
  }
`

export const buttonStyles = baseButtonStyles('normal')
export const smallButtonStyles = baseButtonStyles('small')
