const semVersion = 'v1.0.0' // x-release-please-version
const cacheVersion = semVersion.replaceAll('.', '_')
const putInCache = async (request, response) => {
  const cache = await caches.open(cacheVersion)
  await cache.put(request, response)
}

const cacheFirst = async ({ request, fallbackUrl }) => {
  // First try to get the resource from the cache
  const cache = await caches.open(cacheVersion)
  const responseFromCache = await cache.match(request)
  const isDev = self.location.href.includes('localhost') ? 'true' : 'false'
  if (isDev === 'false' && responseFromCache) {
    const headers = new Headers(responseFromCache.headers)
    headers.set('X-Cache-Status', 'Cache')

    return new Response(responseFromCache.body, {
      status: responseFromCache.status,
      statusText: responseFromCache.statusText,
      headers,
    })
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request)
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone())
    return responseFromNetwork
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl)
    if (fallbackResponse) {
      return fallbackResponse
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}

self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      fallbackUrl: '/gallery/myLittleVader.jpg',
    }),
  )
})
