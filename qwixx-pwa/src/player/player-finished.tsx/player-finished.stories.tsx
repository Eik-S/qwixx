import { Meta, StoryObj } from '@storybook/react/*'
import { PlayerFinishedUi } from './player-finished-ui'
import { getNewPlayer } from '../../utils/player-factory'
import { css } from '@emotion/react'

const PlayerFinishedWithWrapper: typeof PlayerFinishedUi = (args) => {
  return (
    <div css={styles.wrapper}>
      <PlayerFinishedUi {...args} />
    </div>
  )
}

const meta: Meta = {
  title: 'Player/Finished',
  component: PlayerFinishedWithWrapper,
  args: {
    player: getNewPlayer(),
  },
  argTypes: {
    isWinningPlayer: { control: 'boolean' },
    numberOfWins: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['player'],
    },
  },
} satisfies Meta<typeof PlayerFinishedUi>

export default meta
type Story = StoryObj<typeof meta>

export const Finished: Story = {
  args: {
    isWinningPlayer: false,
    numberOfWins: 5,
  },
}

const styles = {
  wrapper: css`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
  `,
}
