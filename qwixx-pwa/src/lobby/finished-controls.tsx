import { css } from '@emotion/react'
import { responsiveColors } from '../assets/colors'
import { BigButton } from '../controls/ui-elements'
import { useGameStateContext } from '../hooks/use-global-game-state'

export function FinishedControls({ ...props }) {
  const { startNewGame, returnToLobby } = useGameStateContext()
  return (
    <div css={styles.controlsContainer} {...props}>
      <BigButton css={styles.toLobbyButton} onClick={() => returnToLobby()} text="<- lobby" />
      <BigButton onClick={() => startNewGame()} text="new game" />
    </div>
  )
}

const styles = {
  toLobbyButton: css`
    margin-right: 32px;
    border: none;
  `,
  controlsContainer: css`
    ${responsiveColors.border}
    border: 4px solid;
    padding: 32px;
    display: flex;
    flex-direction: row;
  `,
}
