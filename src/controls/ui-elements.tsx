import { css } from '@emotion/react'
import { MouseEventHandler } from 'react'
import { buttonStyles, smallButtonStyles } from '../utils/button-styles'

export interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  labelId?: string
}

interface PlusMinusButtonProps extends ButtonProps {
  type: 'plus' | 'minus'
}

function PlusMinusButton({ onClick, disabled, type, ...props }: PlusMinusButtonProps) {
  return (
    <button css={styles.plusMinusButtonStyles} onClick={onClick} disabled={disabled} {...props}>
      {type === 'plus' ? '+' : '-'}
    </button>
  )
}

export function MinusButton({ onClick, disabled, ...props }: ButtonProps) {
  return PlusMinusButton({ onClick, disabled, type: 'minus', ...props })
}

export function PlusButton({ onClick, disabled, ...props }: ButtonProps) {
  return PlusMinusButton({ onClick, disabled, type: 'plus', ...props })
}

export interface BigButtonProps extends ButtonProps {
  text: string
}

export function BigButton({ onClick, disabled, text, ...props }: BigButtonProps) {
  return (
    <button css={styles.bigButton} disabled={disabled} onClick={onClick} {...props}>
      {text}
    </button>
  )
}

export interface CheckboxProps {
  checked: boolean
  onChange: () => void
  labelId?: string
}

export function Checkbox({ checked, onChange, labelId, ...props }: CheckboxProps) {
  return (
    <button css={styles.checkbox} id={labelId} onClick={onChange} {...props}>
      {checked ? 'X' : ''}
    </button>
  )
}

export interface LabelProps {
  text: string
  htmlFor: string
}

export function Label({ text, htmlFor, ...props }: LabelProps) {
  return (
    <label css={styles.label} htmlFor={htmlFor} {...props}>
      {text}
    </label>
  )
}

const styles = {
  plusMinusButtonStyles: css`
    ${smallButtonStyles}
    padding-bottom: 1px;
    width: 48px;
    height: 48px;
  `,
  bigButton: css`
    ${buttonStyles}
  `,
  checkbox: css`
    ${smallButtonStyles}
    width: 48px;
    height: 48px;
  `,
  label: css`
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 16px;
    align-self: center;
  `,
}
