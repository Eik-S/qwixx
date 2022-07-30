import { css } from '@emotion/react'
import { useEffect } from 'react'
import { useMatchupContext } from '../hooks/use-matchup'
import { usePlayerStateContext } from '../hooks/use-player-game-state'
import { Avatar } from './player-selection/player-avatar-selection'
import {
  confetti,
  Color as PartyColor,
  settings as partySettings,
  random as partyRandom,
} from 'party-js'
import { colors } from '../assets/colors'

export function PlayerFinishedScreen({ ...props }) {
  const { player, isWinningPlayer } = usePlayerStateContext()
  const { currentMatchup } = useMatchupContext()

  const numberOfWins = currentMatchup!.players.find(
    (matchupPlayer) => matchupPlayer.id === player.id,
  )!.wins

  // confetti animation
  useEffect(() => {
    if (!isWinningPlayer) return

    const playerArea = document.getElementById(`player-area-${player.id}`)
    if (!playerArea) {
      return
    }

    partySettings.gravity = 0
    confetti(playerArea, {
      count: 120,
      spread: 360,
      speed: partyRandom.randomRange(50, 300),
      shapes: 'square',
      color: [
        PartyColor.fromHex(colors.darkRed),
        PartyColor.fromHex(colors.darkGreen),
        PartyColor.fromHex(colors.darkBlue),
        PartyColor.fromHex(colors.darkYellow),
      ],
    })
  }, [isWinningPlayer, player.id])

  return (
    <div id={`player-area-${player.id}`} {...props}>
      <div css={styles.crowns(!!isWinningPlayer, numberOfWins)}>
        {[...Array(numberOfWins)].map((_, index) => (
          <span key={index} css={styles.crown(index)}>
            <span>👑</span>
          </span>
        ))}
      </div>
      <Avatar code={player.avatarCode} />
    </div>
  )
}

function getRandomCrownRotation(): string {
  const negative = Math.random() < 0.5
  const rotation = Math.floor(Math.random() * 10) * (negative ? -1 : 1)
  return `${rotation}deg`
}

const styles = {
  crowns: (isWinningPlayer: boolean, numberOfWins: number) => css`
    position: relative;
    margin-bottom: 16px;
    display: flex;
    justify-content: center;

    ${isWinningPlayer &&
    css`
      & > span:last-of-type {
        animation: animateCrownPlacement 2s ease-in-out;
      }

      @keyframes animateCrownPlacement {
        0% {
          width: 80px;
          font-size: 30px;
          top: ${numberOfWins * -20 + -80}px;
        }
        30% {
          width: 200px;
          font-size: 80px;
        }
        100% {
          width: 20px;
          font-size: 24px;
        }
      }
    `}
  `,
  crown: (index: number) => css`
    position: absolute;
    font-size: 24px;
    font-family: 'NotoEmoji';
    line-height: 24px;
    width: 20px;
    display: inline-block;
    text-align: center;
    top: ${index * -20}px;
    rotate: ${getRandomCrownRotation()};
    background-color: white;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    & > span {
      margin-left: -5px;
    }
  `,
}
