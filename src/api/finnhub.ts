const FINNHUB_BASE = 'https://finnhub.io/api/v1'

export interface FinnhubQuote {
  c: number   // current price
  d: number   // change
  dp: number  // change percent
  h: number   // high
  l: number   // low
  o: number   // open
  pc: number  // previous close
  t: number   // timestamp
}

export async function fetchQuote(
  symbol: string,
  apiKey: string
): Promise<FinnhubQuote | null> {
  try {
    const res = await fetch(
      `${FINNHUB_BASE}/quote?symbol=${symbol}&token=${apiKey}`
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!data.c) return null // invalid/empty quote
    return data
  } catch {
    return null
  }
}

export async function fetchAllQuotes(
  symbols: string[],
  apiKey: string
): Promise<Map<string, FinnhubQuote>> {
  const map = new Map<string, FinnhubQuote>()
  const results = await Promise.allSettled(
    symbols.map(async s => {
      const quote = await fetchQuote(s, apiKey)
      return { symbol: s, quote }
    })
  )
  for (const r of results) {
    if (r.status === 'fulfilled' && r.value.quote) {
      map.set(r.value.symbol, r.value.quote)
    }
  }
  return map
}

// --- Forex (free, no API key) ---

export interface ForexRates {
  ILS: number
  EUR: number
}

// --- Tel Aviv Indices (Yahoo Finance via CORS proxy) ---

export interface YahooIndexQuote {
  price: number
  previousClose: number
}

const ALLORIGINS = 'https://api.allorigins.win/raw?url='

async function fetchYahooIndex(symbol: string): Promise<YahooIndexQuote | null> {
  try {
    const yahooUrl = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=2d`
    const res = await fetch(`${ALLORIGINS}${encodeURIComponent(yahooUrl)}`)
    if (!res.ok) return null
    const data = await res.json()
    const meta = data?.chart?.result?.[0]?.meta
    if (!meta?.regularMarketPrice) return null
    return {
      price: meta.regularMarketPrice,
      previousClose: meta.chartPreviousClose ?? meta.regularMarketPrice,
    }
  } catch {
    return null
  }
}

export async function fetchTAIndices(): Promise<Map<string, YahooIndexQuote>> {
  const symbols = [
    { key: 'TA125', symbol: '^TA125.TA' },
    { key: 'TA35', symbol: 'TA35.TA' },
  ]
  const map = new Map<string, YahooIndexQuote>()
  const results = await Promise.allSettled(
    symbols.map(async s => {
      const quote = await fetchYahooIndex(s.symbol)
      return { key: s.key, quote }
    })
  )
  for (const r of results) {
    if (r.status === 'fulfilled' && r.value.quote) {
      map.set(r.value.key, r.value.quote)
    }
  }
  return map
}

export async function fetchForexRates(): Promise<ForexRates | null> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD')
    if (!res.ok) return null
    const data = await res.json()
    return {
      ILS: data.rates?.ILS ?? null,
      EUR: data.rates?.EUR ?? null,
    }
  } catch {
    return null
  }
}
