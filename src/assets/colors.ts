export const colors = {
  red: '#D73F4C',
  lightRed: '#F9E0E5',
  darkRed: '#943037',

  yellow: '#F2C73A',
  lightYellow: '#FDF9F1',
  darkYellow: '#D8A352',

  green: '#419F5B',
  lightGreen: '#EAF3F1',
  darkGreen: '#3F7C52',

  blue: '#3A4A8B',
  lightBlue: '#E4E0F3',
  darkBlue: '#2D2E4B',

  grey: '#BDBDBD',
  lightGrey: '#E3E3E3',
  darkGrey: '#434343',

  background: '#fff',
}

export function getHexColor(colorString: string, accent?: 'light' | 'dark'): string {
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
  } else throw Error(`Invalid colorString provided: ${colorString}`)
}
