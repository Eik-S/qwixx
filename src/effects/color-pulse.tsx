import { css } from '@emotion/react'
import { useEffect, useState } from 'react'

interface ColorPulseProps {
  color: string
  onPulseShown: () => void
}

export function ColorPulse({ color, onPulseShown }: ColorPulseProps) {
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    console.log({ showPulse })
  }, [showPulse])

  useEffect(() => {
    setShowPulse(true)
    const timeout = setTimeout(() => {
      setShowPulse(false)
      onPulseShown()
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [onPulseShown])

  return <div css={styles.fullScreenPulse(color, showPulse)}></div>
}

const styles = {
  fullScreenPulse: (color: string, showPulse: boolean) => css`
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    box-shadow: inset 0 0 0 0 ${color};
    transition: box-shadow 0.2s linear;

    ${showPulse &&
    css`
      transition: box-shadow 0.1s linear;
      box-shadow: inset 0 0 5vw -1vw ${color};
    `}
  `,
}
