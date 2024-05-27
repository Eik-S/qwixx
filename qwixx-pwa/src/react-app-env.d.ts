/// <reference types="react-scripts" />

import { SerializedStyles } from '@emotion/react'

declare module 'react' {
  interface Attributes {
    css?: SerializedStyles
  }
}
