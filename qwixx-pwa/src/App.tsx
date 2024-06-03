import { useEffect, useState } from 'react'
import { Game } from './game/game'
import { GameStateContextProvider } from './hooks/use-global-game-state'
import { MatchupContextProvider } from './hooks/use-matchup'
import { css } from '@emotion/react'

async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/service-worker/sw.js', {
      scope: './../',
    })
    if (registration.installing) {
      console.log('Service worker installing')
    } else if (registration.waiting) {
      console.log('Service worker installed')
    } else if (registration.active) {
      console.log('Service worker active')
    }
  } catch (error) {
    console.error(`Registration failed with ${error}`)
  }
}

const isDev = window.location.href.startsWith('http://localhost')
if (isDev || 'serviceWorker' in navigator) {
  registerServiceWorker()
}

export function App() {
  const [servedBy, setServedBy] = useState<'cache' | 'network' | 'loading'>('loading')

  useEffect(() => {
    fetch('fav.png').then((response) => {
      console.log({ response })
      if (response.headers.get('X-Cache-Status') === 'Cache') {
        setServedBy('cache')
      } else {
        setServedBy('network')
      }
    })
  }, [])

  return (
    <>
      <div css={styles.servedByBanner}>{servedBy}</div>
      <MatchupContextProvider>
        <GameStateContextProvider>
          <Game />
        </GameStateContextProvider>
      </MatchupContextProvider>
    </>
  )
}

const styles = {
  servedByBanner: css`
    top: 0;
    left: 0;
    position: fixed;
    width: 100px;
    text-align: center;
    padding: 12px;
  `,
}
