import { useLiveStocks } from '../../hooks/useSocialSentiment.ts'

function LoadingSkeleton() {
  return (
    <div className="space-y-0">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="py-2.5 border-b border-border/30 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-12 bg-border/40 rounded" />
              <div className="h-3 w-16 bg-border/30 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-14 bg-border/30 rounded" />
              <div className="h-3 w-12 bg-border/30 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function LiveStockPrices() {
  const { data, loading, isLive } = useLiveStocks()

  return (
    <div className="widget-card animate-slide-in-right" style={{ animationDelay: '100ms' }}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[13px] font-bold text-dark tracking-wide">
          מניות מובילות
        </h3>
        {isLive ? (
          <span className="flex items-center gap-1 text-[10px] text-green-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
        ) : (
          <span className="text-[10px] text-text-tertiary">Demo</span>
        )}
      </div>
      <p className="text-[11px] text-text-tertiary mb-4">
        {isLive ? 'מחירים בזמן אמת · Finnhub' : 'נתוני דמו — הוסף מפתח Finnhub'}
      </p>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="space-y-0">
          {data.map((stock, index) => (
            <div
              key={stock.ticker}
              className="social-stock-row animate-fade-in"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold text-dark font-inter">
                    {stock.ticker}
                  </span>
                  <span className="text-[12px] text-text-secondary">
                    {stock.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-dark font-inter">
                    ${stock.price.toFixed(2)}
                  </span>
                  <span className={`text-[11px] font-semibold font-inter px-1.5 py-0.5 rounded ${
                    stock.changePercent > 0
                      ? 'text-green-700 bg-green-50'
                      : stock.changePercent < 0
                      ? 'text-red-600 bg-red-50'
                      : 'text-text-tertiary bg-gray-50'
                  }`}>
                    {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-text-tertiary mt-3 border-t border-border/50 pt-3">
        {isLive
          ? 'נתונים אמיתיים מ-Finnhub · מתעדכן כל 5 דק׳'
          : 'נתונים לדוגמה'}
      </p>
    </div>
  )
}
