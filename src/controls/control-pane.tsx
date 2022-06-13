/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export interface ControlPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  numOfPlayers: number
  onNumOfPlayersChange: (numOfPlayers: number) => void
  onClickNewGame: () => void
  isBig: boolean
  onChangeIsBig: (newValue: boolean) => void
}

export function ControlPane({
  onNumOfPlayersChange,
  numOfPlayers,
  onClickNewGame,
  isBig,
  onChangeIsBig,
  ...props
}: ControlPaneProps) {
  function handleNumOfPlayersChange(e: React.ChangeEvent<HTMLInputElement>) {
    onNumOfPlayersChange(parseInt(e.target.value))
  }
  return (
    <div {...props} css={styles.pane}>
      <h2 css={styles.headline}>Settings</h2>
      <div css={styles.controlsGrid}>
        <label htmlFor="numPayersSlider">Number of PLayers: {numOfPlayers}</label>
        <input
          value={numOfPlayers}
          onChange={(handler) => handleNumOfPlayersChange(handler)}
          id="numPlayersSlider"
          type="range"
          min="2"
          max="4"
          step="1"
        />
        <label htmlFor="isBig">Günter Mode</label>
        <input
          type="checkbox"
          id="isBig"
          checked={isBig}
          onChange={(e) => onChangeIsBig(e.target.checked)}
        />
        <button css={styles.restartButton} onClick={() => onClickNewGame()} className="button">
          new game
        </button>
      </div>
    </div>
  )
}

const styles = {
  pane: css`
    padding: 32px;
  `,
  headline: css`
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 42px;
  `,
  controlsGrid: css`
    display: grid;
    grid-template-columns: auto auto;
    grid-auto-rows: auto;
    justify-content: center;
    grid-column-gap: 46px;
    grid-row-gap: 32px;

    label {
      vertical-align: middle;
      font-size: 16px;
      text-transform: uppercase;
      font-weight: bold;
      line-height: 16px;
      align-self: center;
    }
  `,
  restartButton: css`
    display: inline;
    justify-self: center;
    grid-column: 1 / span 2;
  `,
}
