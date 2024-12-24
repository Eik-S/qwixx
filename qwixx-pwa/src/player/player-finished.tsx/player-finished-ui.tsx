import { css } from '@emotion/react'
import {
  confetti,
  Color as PartyColor,
  random as partyRandom,
  settings as partySettings,
} from 'party-js'
import { useEffect } from 'react'
import { colors } from '../../assets/colors'
import { Player } from '../../models/game'
import { Avatar } from '../player-selection/player-avatar-selection'

interface PlayerFinishedUiProps {
  player: Player
  isWinningPlayer: boolean | undefined
  numberOfWins: number
}

export function PlayerFinishedUi({
  isWinningPlayer,
  numberOfWins,
  player,
  ...props
}: PlayerFinishedUiProps) {
  const randomRotation = createMostLikelyRotationFactory()
  const crownPositionData = [...Array(numberOfWins)]
    .map(randomRotation)
    .map((value, index, values) => getCrownPositionData(value, values.slice(0, index)))
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
        {crownPositionData.map(({ rotation, translateX }, index) => (
          <span key={index} css={styles.crown(rotation, translateX, index)}>
            <span>👑</span>
          </span>
        ))}
      </div>
      <Avatar code={player.avatarCode} />
    </div>
  )
}

function createMostLikelyRotationFactory() {
  let previousRotation = 0
  return () => {
    const factor = previousRotation < 0 ? 0.99 : 0.01
    const negative = Math.random() * factor
    const newRotation = Math.floor(Math.random() * 10) * (negative ? -1 : 1)
    console.log({ previousRotation, newRotation })
    previousRotation = newRotation
    return newRotation
  }
}

function getCrownPositionData(
  rotation: number,
  previousRotations: number[],
): { translateX: number; rotation: number } {
  const translateX = previousRotations.reduce((prev, curr) => prev + curr, 0) / 3
  return {
    rotation,
    translateX,
  }
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
        animation: animateCrownPlacement 2.5s ease-in-out;
      }

      @keyframes animateCrownPlacement {
        0% {
          font-size: 30px;
          top: ${numberOfWins * -20 + -80}px;
          background-color: transparent;
          rotate: 0deg;
        }
        10% {
          font-size: 80px;
          width: 100px;
        }
        14%,
        22% {
          rotate: 10deg;
        }
        18%,
        26% {
          rotate: -10deg;
        }
        30% {
          rotate: getRandomCrownRotation();
          top: ${numberOfWins * -20 + -80}px;
          font-size: 80px;
          width: 100px;
        }
        100% {
          width: 20px;
          font-size: 24px;
        }
      }
    `}
  `,
  crown: (rotation: number, translateX: number, index: number) => css`
    position: absolute;
    font-size: 24px;
    font-family: 'NotoEmoji';
    line-height: 24px;
    width: 20px;
    display: inline-block;
    text-align: center;
    top: ${index * -20}px;
    transform: translateX(${`${translateX}px`}) rotate(${`${rotation}deg`});
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    & > span {
      margin-left: -5px;
    }
  `,
}
