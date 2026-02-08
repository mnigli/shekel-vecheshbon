import { marketData } from '../../data/marketData.ts'

export default function MarketTicker() {
  return (
    <div className="bg-surface rounded-lg border border-border p-5">
      <h3 className="text-[13px] font-bold text-dark mb-4 tracking-wide">נתוני שוק</h3>
      <div className="space-y-0">
        {marketData.map(item => (
          <div key={item.name} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
            <span className="text-[13px] text-text-secondary">{item.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-medium text-dark font-inter">
                {item.value.toLocaleString('he-IL', { minimumFractionDigits: 2 })}
              </span>
              <span className={`text-[11px] font-medium font-inter ${
                item.direction === 'up'
                  ? 'text-green-600'
                  : item.direction === 'down'
                  ? 'text-red-500'
                  : 'text-text-tertiary'
              }`}>
                {item.direction === 'up' ? '+' : item.direction === 'down' ? '' : ''}{item.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-text-tertiary mt-3">נתונים לדוגמה בלבד</p>
    </div>
  )
}
