import { useState, type ReactNode } from 'react'

type Platform = 'twitter' | 'reddit' | 'linkedin' | 'tiktok'

interface SocialStock {
  ticker: string
  name: string
  platform: Platform
  mentions: number
  weeklyChange: number
  sentiment: 'bullish' | 'bearish' | 'neutral'
}

const platforms: { id: Platform; name: string; nameHe: string }[] = [
  { id: 'twitter', name: 'X', nameHe: 'טוויטר' },
  { id: 'reddit', name: 'Reddit', nameHe: 'רדיט' },
  { id: 'linkedin', name: 'LinkedIn', nameHe: 'לינקדאין' },
  { id: 'tiktok', name: 'TikTok', nameHe: 'טיקטוק' },
]

const socialTrends: SocialStock[] = [
  // Twitter / X
  { ticker: 'TSLA', name: 'Tesla', platform: 'twitter', mentions: 12400, weeklyChange: 32, sentiment: 'bullish' },
  { ticker: 'NVDA', name: 'NVIDIA', platform: 'twitter', mentions: 9800, weeklyChange: 28, sentiment: 'bullish' },
  { ticker: 'GME', name: 'GameStop', platform: 'twitter', mentions: 7500, weeklyChange: -15, sentiment: 'bearish' },
  { ticker: 'AAPL', name: 'Apple', platform: 'twitter', mentions: 6200, weeklyChange: 5, sentiment: 'neutral' },
  // Reddit
  { ticker: 'GME', name: 'GameStop', platform: 'reddit', mentions: 18200, weeklyChange: 45, sentiment: 'bullish' },
  { ticker: 'AMC', name: 'AMC Ent.', platform: 'reddit', mentions: 11300, weeklyChange: 22, sentiment: 'bullish' },
  { ticker: 'PLTR', name: 'Palantir', platform: 'reddit', mentions: 8700, weeklyChange: 18, sentiment: 'bullish' },
  { ticker: 'SOFI', name: 'SoFi', platform: 'reddit', mentions: 5400, weeklyChange: -8, sentiment: 'bearish' },
  // LinkedIn
  { ticker: 'MSFT', name: 'Microsoft', platform: 'linkedin', mentions: 8900, weeklyChange: 12, sentiment: 'bullish' },
  { ticker: 'GOOGL', name: 'Alphabet', platform: 'linkedin', mentions: 7100, weeklyChange: 9, sentiment: 'neutral' },
  { ticker: 'META', name: 'Meta', platform: 'linkedin', mentions: 6800, weeklyChange: 15, sentiment: 'bullish' },
  { ticker: 'CRM', name: 'Salesforce', platform: 'linkedin', mentions: 4200, weeklyChange: -6, sentiment: 'bearish' },
  // TikTok
  { ticker: 'TSLA', name: 'Tesla', platform: 'tiktok', mentions: 22100, weeklyChange: 41, sentiment: 'bullish' },
  { ticker: 'BTC', name: 'Bitcoin', platform: 'tiktok', mentions: 19500, weeklyChange: 35, sentiment: 'bullish' },
  { ticker: 'NVDA', name: 'NVIDIA', platform: 'tiktok', mentions: 14200, weeklyChange: 27, sentiment: 'bullish' },
  { ticker: 'AMC', name: 'AMC Ent.', platform: 'tiktok', mentions: 8900, weeklyChange: -12, sentiment: 'bearish' },
]

const platformIcons: Record<Platform, ReactNode> = {
  twitter: (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  reddit: (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 13.98c.04.252.06.51.06.774 0 3.96-4.612 7.17-10.3 7.17S-2.475 18.714-2.475 14.754c0-.264.02-.522.06-.774A1.847 1.847 0 01-3.6 12.27a1.85 1.85 0 013.154-1.31c1.462-1.056 3.478-1.734 5.726-1.818l.96-4.53a.296.296 0 01.354-.234l3.19.672a1.32 1.32 0 012.472.756 1.32 1.32 0 01-1.32 1.32 1.318 1.318 0 01-1.302-1.14l-2.834-.594-.846 3.996c2.214.096 4.194.774 5.634 1.818a1.847 1.847 0 013.154 1.31 1.847 1.847 0 01-1.182 1.71zM8.4 13.5a1.35 1.35 0 100 2.7 1.35 1.35 0 000-2.7zm7.2 0a1.35 1.35 0 100 2.7 1.35 1.35 0 000-2.7zm-7.068 4.26a.3.3 0 01.042-.42.3.3 0 01.42-.042c.726.546 1.74.84 2.94.84h.132c1.2 0 2.214-.294 2.94-.84a.3.3 0 01.42.042.3.3 0 01-.042.42c-.846.636-1.98.978-3.318.978h-.132c-1.338 0-2.472-.342-3.318-.978z" transform="translate(2.475 2.076)" />
    </svg>
  ),
  linkedin: (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  tiktok: (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
}

function formatMentions(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return n.toString()
}

export default function SocialTrends() {
  const [activePlatform, setActivePlatform] = useState<Platform>('twitter')

  const filteredStocks = socialTrends.filter(s => s.platform === activePlatform)

  return (
    <div className="widget-card animate-slide-in-right" style={{ animationDelay: '150ms' }}>
      <h3 className="text-[13px] font-bold text-dark mb-1 tracking-wide">
        טרנדים ברשתות
      </h3>
      <p className="text-[11px] text-text-tertiary mb-4">
        מניות שמדברים עליהן השבוע
      </p>

      {/* Platform tabs */}
      <div className="flex gap-1.5 mb-4">
        {platforms.map(p => (
          <button
            key={p.id}
            onClick={() => setActivePlatform(p.id)}
            className={`social-tab flex items-center gap-1.5 ${
              activePlatform === p.id ? 'social-tab-active' : ''
            }`}
            title={p.nameHe}
          >
            {platformIcons[p.id]}
            <span className="hidden sm:inline">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Stock list */}
      <div className="space-y-0">
        {filteredStocks.map((stock, index) => (
          <div
            key={stock.ticker}
            className="social-stock-row animate-fade-in"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-dark font-inter">
                  {stock.ticker}
                </span>
                <span className="text-[12px] text-text-secondary">
                  {stock.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold font-inter ${
                  stock.weeklyChange > 0 ? 'text-green-600' : stock.weeklyChange < 0 ? 'text-red-500' : 'text-text-tertiary'
                }`}>
                  {stock.weeklyChange > 0 ? '↑' : stock.weeklyChange < 0 ? '↓' : '–'}{Math.abs(stock.weeklyChange)}%
                </span>
                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                  stock.sentiment === 'bullish'
                    ? 'sentiment-bullish'
                    : stock.sentiment === 'bearish'
                    ? 'sentiment-bearish'
                    : 'sentiment-neutral'
                }`}>
                  {stock.sentiment === 'bullish' ? 'חיובי' : stock.sentiment === 'bearish' ? 'שלילי' : 'נייטרלי'}
                </span>
              </div>
            </div>
            <div className="text-[11px] text-text-tertiary font-inter">
              {formatMentions(stock.mentions)} אזכורים
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-text-tertiary mt-3 border-t border-border/50 pt-3">
        נתונים לדוגמה — מבוסס על מגמות שבועיות
      </p>
    </div>
  )
}
