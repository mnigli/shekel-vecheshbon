import { useState, useEffect, useRef } from 'react'
import { fetchAllQuotes } from '../api/finnhub.ts'
import { TRACKED_SYMBOLS } from '../data/socialTrends.ts'

export interface LiveStock {
  ticker: string
  name: string
  price: number
  changePercent: number
}

const FALLBACK_STOCKS: LiveStock[] = [
  { ticker: 'TSLA', name: 'Tesla', price: 411.12, changePercent: 3.50 },
  { ticker: 'NVDA', name: 'NVIDIA', price: 185.42, changePercent: 7.88 },
  { ticker: 'AAPL', name: 'Apple', price: 232.80, changePercent: 1.20 },
  { ticker: 'MSFT', name: 'Microsoft', price: 410.35, changePercent: -0.45 },
  { ticker: 'GOOGL', name: 'Alphabet', price: 196.00, changePercent: 0.85 },
  { ticker: 'META', name: 'Meta', price: 718.20, changePercent: 2.10 },
  { ticker: 'AMZN', name: 'Amazon', price: 233.14, changePercent: -1.30 },
  { ticker: 'AMD', name: 'AMD', price: 119.50, changePercent: 4.22 },
]

const REFRESH_INTERVAL = 5 * 60 * 1000

export function useLiveStocks() {
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY as string | undefined
  const [data, setData] = useState<LiveStock[]>(FALLBACK_STOCKS)
  const [loading, setLoading] = useState(!!apiKey)
  const [isLive, setIsLive] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!apiKey) return

    let cancelled = false

    async function load() {
      setLoading(true)
      const quotes = await fetchAllQuotes(
        TRACKED_SYMBOLS.map(s => s.ticker),
        apiKey!
      )
      if (cancelled) return

      if (quotes.size > 0) {
        const stocks: LiveStock[] = []
        for (const sym of TRACKED_SYMBOLS) {
          const q = quotes.get(sym.ticker)
          if (q) {
            stocks.push({
              ticker: sym.ticker,
              name: sym.name,
              price: q.c,
              changePercent: q.dp,
            })
          }
        }
        stocks.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
        setData(stocks)
        setIsLive(true)
      }
      setLoading(false)
    }

    load()
    intervalRef.current = setInterval(load, REFRESH_INTERVAL)

    return () => {
      cancelled = true
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [apiKey])

  return { data, loading, isLive }
}
