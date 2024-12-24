import React from 'react'

import type { Preview } from '@storybook/react'
import { Global } from '@emotion/react'
import { globalStyles } from '../src/styles/global-styles'

const preview: Preview = {
  argTypes: {
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  },
  decorators: [
    (Story) => {
      return (
        <>
          <Global styles={globalStyles} />

          <Story />
        </>
      )
    },
  ],
}

export default preview
