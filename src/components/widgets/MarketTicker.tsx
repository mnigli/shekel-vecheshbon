import { useMarketData } from '../../hooks/useMarketData.ts'

function LoadingSkeleton() {
  return (
    <div className="space-y-0">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="flex items-center justify-between py-2.5 px-2 -mx-2 border-b border-border/40 last:border-0 animate-pulse">
          <div className="h-4 w-20 bg-border/40 rounded" />
          <div className="flex items-center gap-3">
            <div className="h-4 w-16 bg-border/30 rounded" />
            <div className="h-4 w-12 bg-border/30 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function MarketTicker() {
  const { data, loading, isLive } = useMarketData()

  return (
    <div className="widget-card animate-slide-in-right" style={{ animationDelay: '100ms' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-bold text-dark tracking-wide">נתוני שוק</h3>
        {isLive ? (
          <span className="flex items-center gap-1 text-[10px] text-green-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
        ) : (
          <span className="text-[10px] text-text-tertiary">Demo</span>
        )}
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="space-y-0">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="ticker-row flex items-center justify-between py-2.5 px-2 -mx-2 rounded-md border-b border-border/40 last:border-0 animate-fade-in"
              style={{ animationDelay: `${150 + index * 60}ms` }}
            >
              <span className="text-[13px] text-text-secondary">{item.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-medium text-dark font-inter">
                  {item.value.toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                {item.change !== 0 && (
                  <span className={`text-[11px] font-semibold font-inter px-1.5 py-0.5 rounded ${
                    item.direction === 'up'
                      ? 'ticker-up bg-green-50'
                      : item.direction === 'down'
                      ? 'ticker-down bg-red-50'
                      : 'text-text-tertiary'
                  }`}>
                    {item.direction === 'up' ? '+' : ''}{item.change}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-text-tertiary mt-3 border-t border-border/50 pt-3">
        {isLive
          ? 'מדדים מ-Finnhub · מט"ח מ-ExchangeRate · כל 5 דק׳'
          : 'נתונים לדוגמה'}
      </p>
    </div>
  )
}
