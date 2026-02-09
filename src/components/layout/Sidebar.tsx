import TrendingList from '../widgets/TrendingList.tsx'
import MarketTicker from '../widgets/MarketTicker.tsx'
import LiveStockPrices from '../widgets/LiveStockPrices.tsx'
import SocialTrends from '../widgets/SocialTrends.tsx'
import NewsletterSignup from '../widgets/NewsletterSignup.tsx'

export default function Sidebar() {
  return (
    <aside className="space-y-6">
      <MarketTicker />
      <LiveStockPrices />
      <SocialTrends />
      <TrendingList />
      <NewsletterSignup />
    </aside>
  )
}
