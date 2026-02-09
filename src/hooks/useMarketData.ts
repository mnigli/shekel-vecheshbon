import { useState, useEffect, useRef } from 'react'
import type { MarketItem } from '../types/index.ts'
import { fetchAllQuotes, fetchForexRates, fetchTAIndices } from '../api/finnhub.ts'
import { marketData as fallbackData } from '../data/marketData.ts'

// US ETFs as proxies for indices
const US_INDEX_SYMBOLS = [
  { symbol: 'SPY', name: 'S&P 500' },
  { symbol: 'DIA', name: 'דאו ג\'ונס' },
  { symbol: 'QQQ', name: 'נאסד"ק 100' },
]

const REFRESH_INTERVAL = 5 * 60 * 1000

function direction(change: number): 'up' | 'down' | 'flat' {
  if (change > 0.05) return 'up'
  if (change < -0.05) return 'down'
  return 'flat'
}

export function useMarketData() {
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY as string | undefined
  const [data, setData] = useState<MarketItem[]>(fallbackData)
  const [loading, setLoading] = useState(!!apiKey)
  const [isLive, setIsLive] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!apiKey) return

    let cancelled = false

    async function load() {
      setLoading(true)

      const [quotes, taIndices, forex] = await Promise.all([
        fetchAllQuotes(US_INDEX_SYMBOLS.map(s => s.symbol), apiKey!),
        fetchTAIndices(),
        fetchForexRates(),
      ])

      if (cancelled) return

      const items: MarketItem[] = []

      // TA indices first (Israeli site)
      const ta125 = taIndices.get('TA125')
      if (ta125) {
        const pct = ((ta125.price - ta125.previousClose) / ta125.previousClose) * 100
        const change = Math.round(pct * 100) / 100
        items.push({
          name: 'ת"א 125',
          value: Math.round(ta125.price * 100) / 100,
          change,
          direction: direction(change),
        })
      }

      const ta35 = taIndices.get('TA35')
      if (ta35) {
        const pct = ((ta35.price - ta35.previousClose) / ta35.previousClose) * 100
        const change = Math.round(pct * 100) / 100
        items.push({
          name: 'ת"א 35',
          value: Math.round(ta35.price * 100) / 100,
          change,
          direction: direction(change),
        })
      }

      // US index ETFs
      for (const idx of US_INDEX_SYMBOLS) {
        const q = quotes.get(idx.symbol)
        if (q) {
          items.push({
            name: idx.name,
            value: q.c,
            change: Math.round(q.dp * 100) / 100,
            direction: direction(q.dp),
          })
        }
      }

      // Forex
      if (forex) {
        if (forex.ILS) {
          items.push({
            name: 'דולר/שקל',
            value: Math.round(forex.ILS * 10000) / 10000,
            change: 0,
            direction: 'flat',
          })
        }
        if (forex.EUR && forex.ILS) {
          const eurIls = forex.ILS / forex.EUR
          items.push({
            name: 'אירו/שקל',
            value: Math.round(eurIls * 10000) / 10000,
            change: 0,
            direction: 'flat',
          })
        }
      }

      if (items.length > 0) {
        setData(items)
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
