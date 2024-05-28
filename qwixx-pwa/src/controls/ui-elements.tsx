import { css } from '@emotion/react'
import { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler } from 'react'
import { buttonStyles, smallButtonStyles } from '../utils/button-styles'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  labelId?: string
}

interface PlusMinusButtonProps extends ButtonProps {
  buttonType: 'plus' | 'minus'
}

function PlusMinusButton({
  onClick,
  disabled,
  buttonType,
  labelId,
  id,
  ...props
}: PlusMinusButtonProps) {
  const defaultLabel = buttonType === 'plus' ? 'increase' : 'descrease'
  const label = props['aria-label'] ?? defaultLabel

  const defaultLabelledBy = id && labelId ? `${id} ${labelId}` : undefined
  const labelledBy = props['aria-labelledby'] ?? defaultLabelledBy

  return (
    <button
      css={styles.plusMinusButtonStyles}
      onClick={onClick}
      aria-labelledby={labelledBy}
      aria-label={label}
      disabled={disabled}
      {...props}
    >
      {buttonType === 'plus' ? '+' : '-'}
    </button>
  )
}

export function MinusButton({ onClick, disabled, labelId, ...props }: ButtonProps) {
  return PlusMinusButton({ onClick, disabled, buttonType: 'minus', labelId, ...props })
}

export function PlusButton({ onClick, disabled, labelId, ...props }: ButtonProps) {
  return PlusMinusButton({ onClick, disabled, buttonType: 'plus', labelId, ...props })
}

export interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  labelId?: string
  id?: string
}

export function BigButton({ onClick, disabled, text, labelId, ...props }: TextButtonProps) {
  return (
    <button
      css={styles.bigButton}
      disabled={disabled}
      id={labelId}
      aria-label={text.toLowerCase()}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  )
}

export function Button({ onClick, disabled, text, labelId, ...props }: TextButtonProps) {
  return (
    <button
      css={styles.button}
      disabled={disabled}
      id={labelId}
      onClick={onClick}
      aria-label={text.toLowerCase()}
      {...props}
    >
      {text}
    </button>
  )
}

export interface CheckboxProps {
  checked: boolean
  onChange: () => void
  id: string
  labelId?: string
}

export function Checkbox({ checked, onChange, labelId, id, ...props }: CheckboxProps) {
  return (
    <button
      css={styles.checkbox}
      id={id}
      onClick={onChange}
      aria-label={checked ? 'disable' : 'enable'}
      aria-labelledby={`${id} ${labelId}`}
      {...props}
    >
      {checked ? 'X' : ''}
    </button>
  )
}

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  text: string
  htmlFor?: string
  id?: string
}

export function Label({ text, htmlFor, id, 'aria-label': passedLabel, ...props }: LabelProps) {
  return (
    <label
      css={styles.label}
      htmlFor={htmlFor}
      id={id}
      aria-label={passedLabel ?? text.toLowerCase()}
      {...props}
    >
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
  button: css`
    ${smallButtonStyles}
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
