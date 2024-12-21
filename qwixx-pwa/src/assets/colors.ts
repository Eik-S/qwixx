import { css } from '@emotion/react'

export const darkMode = '@media (prefers-color-scheme: dark)'
export const colors = {
  red: '#D73F4C',
  lightRed: '#F9E0E5',
  darkRed: '#943037',
  darkerRed: '#500212',

  yellow: '#F2C73A',
  lightYellow: '#FDF9F1',
  darkYellow: '#D8A352',
  darkerYellow: '#47351B',

  green: '#419F5B',
  lightGreen: '#EAF3F1',
  darkGreen: '#3F7C52',
  darkerGreen: '#22432C',

  blue: '#3A4A8B',
  lightBlue: '#E4E0F3',
  darkBlue: '#4E5084',
  darkerBlue: '#1B1B2D',

  grey: '#BDBDBD',
  lightGrey: '#E3E3E3',
  darkGrey: '#434343',
  darkerGrey: '#252525',

  black: '#000000',

  white: '#ffffff',
} as const

export const responsiveColors = {
  background: css`
    background-color: ${colors.white};

    ${darkMode} {
      background-color: ${colors.black};
    }
  `,
  disabledText: css`
    color: ${colors.grey};

    ${darkMode} {
      color: ${colors.darkGrey};
    }
  `,
  text: css`
    color: ${colors.black};

    ${darkMode} {
      color: ${colors.white};
    }
  `,
  border: css`
    border-color: ${colors.darkGrey};
    &:disabled {
      border-color: ${colors.grey};
    }

    ${darkMode} {
      border-color: ${colors.grey};
      &:disabled {
        border-color: ${colors.darkGrey};
      }
    }
  `,
}

export function getHexColor(colorString: string, accent?: 'light' | 'dark' | 'darker'): string {
  if (colorString === 'r') {
    return accent ? colors[`${accent}Red`] : colors.red
  }
  if (colorString === 'y') {
    return accent ? colors[`${accent}Yellow`] : colors.yellow
  }
  if (colorString === 'g') {
    return accent ? colors[`${accent}Green`] : colors.green
  }
  if (colorString === 'b') {
    return accent ? colors[`${accent}Blue`] : colors.blue
  }
  if (colorString === 'w') {
    return accent ? colors[`${accent}Grey`] : colors.grey
  } else throw Error(`Invalid colorString was provided: ${colorString}`)
}
