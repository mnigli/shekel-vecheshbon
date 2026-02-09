import { Link } from 'react-router-dom'
import { articles } from '../../data/articles.ts'

export default function TrendingList() {
  const trending = articles.filter(a => a.isTrending).slice(0, 5)

  return (
    <div className="widget-card animate-slide-in-right" style={{ animationDelay: '200ms' }}>
      <h3 className="text-[13px] font-bold text-dark mb-4 tracking-wide">הנקראים ביותר</h3>
      <ul className="space-y-1">
        {trending.map((article, i) => (
          <li key={article.id}>
            <Link
              to={`/article/${article.slug}`}
              className="trending-item flex items-start gap-3 group"
            >
              <span className="flex-shrink-0 text-[14px] font-inter font-bold text-accent/60 group-hover:text-accent transition-colors mt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[13px] text-text-secondary leading-relaxed group-hover:text-dark transition-colors">
                {article.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
