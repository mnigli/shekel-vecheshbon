import TrendingList from '../widgets/TrendingList.tsx'
import MarketTicker from '../widgets/MarketTicker.tsx'
import NewsletterSignup from '../widgets/NewsletterSignup.tsx'

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      <MarketTicker />
      <TrendingList />
      <NewsletterSignup />
    </aside>
  )
}
