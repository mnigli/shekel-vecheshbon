import { useState, type ReactNode } from 'react'
import { financialTools } from '../data/tools.ts'
import Breadcrumbs from '../components/ui/Breadcrumbs.tsx'
import Sidebar from '../components/layout/Sidebar.tsx'

function ReturnCalculator() {
  const [initial, setInitial] = useState(10000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(10)

  const finalValue = initial * Math.pow(1 + rate / 100, years)
  const totalReturn = finalValue - initial
  const totalReturnPct = ((finalValue / initial - 1) * 100)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[13px] text-text-secondary mb-1">סכום השקעה ראשוני (₪)</label>
        <input
          type="number"
          value={initial}
          onChange={e => setInitial(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-border-dark"
        />
      </div>
      <div>
        <label className="block text-[13px] text-text-secondary mb-1">תשואה שנתית (%)</label>
        <input
          type="number"
          step="0.1"
          value={rate}
          onChange={e => setRate(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-border-dark"
        />
      </div>
      <div>
        <label className="block text-[13px] text-text-secondary mb-1">תקופה (שנים)</label>
        <input
          type="number"
          value={years}
          onChange={e => setYears(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-border-dark"
        />
      </div>
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">שווי סופי</span>
          <span className="font-bold text-dark font-inter">₪{finalValue.toLocaleString('he-IL', { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">רווח כולל</span>
          <span className="font-medium text-emerald-600 font-inter">₪{totalReturn.toLocaleString('he-IL', { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">תשואה כוללת</span>
          <span className="font-medium text-emerald-600 font-inter">{totalReturnPct.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(1000)
  const [monthly, setMonthly] = useState(500)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(20)

  const monthlyRate = rate / 100 / 12
  const months = years * 12
  const futureValuePrincipal = principal * Math.pow(1 + monthlyRate, months)
  const futureValueMonthly = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  const totalValue = futureValuePrincipal + futureValueMonthly
  const totalInvested = principal + monthly * months

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[13px] text-text-secondary mb-1">סכום התחלתי (₪)</label>
        <input
          type="number"
          value={principal}
          onChange={e => setPrincipal(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-border-dark"
        />
      </div>
      <div>
        <label className="block text-[13px] text-text-secondary mb-1">הפקדה חודשית (₪)</label>
        <input
          type="number"
          value={monthly}
          onChange={e => setMonthly(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-border-dark"
        />
      </div>
      <div>
        <label className="block text-[13px] text-text-secondary mb-1">ריבית שנתית (%)</label>
        <input
          type="number"
          step="0.1"
          value={rate}
          onChange={e => setRate(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-border-dark"
        />
      </div>
      <div>
        <label className="block text-[13px] text-text-secondary mb-1">תקופה (שנים)</label>
        <input
          type="number"
          value={years}
          onChange={e => setYears(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-border-dark"
        />
      </div>
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">שווי סופי</span>
          <span className="font-bold text-dark font-inter">₪{totalValue.toLocaleString('he-IL', { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">סה״כ הושקע</span>
          <span className="font-inter text-text-secondary">₪{totalInvested.toLocaleString('he-IL', { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">רווח מריבית דריבית</span>
          <span className="font-medium text-emerald-600 font-inter">₪{(totalValue - totalInvested).toLocaleString('he-IL', { maximumFractionDigits: 0 })}</span>
        </div>
      </div>
    </div>
  )
}

function DurationCalculator() {
  const [faceValue, setFaceValue] = useState(100)
  const [coupon, setCoupon] = useState(4)
  const [ytm, setYtm] = useState(5)
  const [years, setYears] = useState(5)

  // Macaulay duration calculation
  let numerator = 0
  let denominator = 0
  for (let t = 1; t <= years; t++) {
    const cf = t < years ? faceValue * coupon / 100 : faceValue * (1 + coupon / 100)
    const pv = cf / Math.pow(1 + ytm / 100, t)
    numerator += t * pv
    denominator += pv
  }
  const duration = denominator > 0 ? numerator / denominator : 0
  const modifiedDuration = duration / (1 + ytm / 100)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[13px] text-text-secondary mb-1">ערך נקוב (₪)</label>
        <input
          type="number"
          value={faceValue}
          onChange={e => setFaceValue(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-border-dark"
        />
      </div>
      <div>
        <label className="block text-[13px] text-text-secondary mb-1">קופון שנתי (%)</label>
        <input
          type="number"
          step="0.1"
          value={coupon}
          onChange={e => setCoupon(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-border-dark"
        />
      </div>
      <div>
        <label className="block text-[13px] text-text-secondary mb-1">תשואה לפדיון (%)</label>
        <input
          type="number"
          step="0.1"
          value={ytm}
          onChange={e => setYtm(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-border-dark"
        />
      </div>
      <div>
        <label className="block text-[13px] text-text-secondary mb-1">שנים לפדיון</label>
        <input
          type="number"
          value={years}
          onChange={e => setYears(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-border-dark"
        />
      </div>
      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">מח״מ (Macaulay)</span>
          <span className="font-bold text-dark font-inter">{duration.toFixed(2)} שנים</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">מח״מ מתוקן (Modified)</span>
          <span className="font-medium text-dark font-inter">{modifiedDuration.toFixed(2)} שנים</span>
        </div>
      </div>
    </div>
  )
}

const calculators: Record<string, () => ReactNode> = {
  'return-calculator': ReturnCalculator,
  'compound-interest': CompoundInterestCalculator,
  'duration-calculator': DurationCalculator,
}

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState(financialTools[0]?.type || 'return-calculator')
  const ActiveCalculator = calculators[activeTool]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'כלים פיננסיים' }]} />

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-dark mb-2">כלים פיננסיים</h1>
        <p className="text-text-secondary text-sm">מחשבונים פיננסיים שיעזרו לך לתכנן ולקבל החלטות</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          {/* Tool selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {financialTools.map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.type)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium border transition-colors ${
                  activeTool === tool.type
                    ? 'border-dark bg-dark text-white'
                    : 'border-border text-text-secondary hover:border-border-dark'
                }`}
              >
                <span>{tool.icon}</span>
                {tool.title}
              </button>
            ))}
          </div>

          {/* Calculator */}
          <div className="bg-surface border border-border rounded-lg p-6 max-w-lg">
            <h2 className="text-lg font-bold text-dark mb-1">
              {financialTools.find(t => t.type === activeTool)?.title}
            </h2>
            <p className="text-[13px] text-text-secondary mb-6">
              {financialTools.find(t => t.type === activeTool)?.description}
            </p>
            {ActiveCalculator && <ActiveCalculator />}
          </div>

          <p className="text-[11px] text-text-tertiary mt-4">
            * המחשבונים מיועדים להדגמה בלבד ואינם מהווים ייעוץ פיננסי. התוצאות הן אומדן בלבד.
          </p>
        </div>

        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="lg:sticky lg:top-28">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
