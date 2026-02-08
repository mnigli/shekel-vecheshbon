import { Link } from 'react-router-dom'
import { articles } from '../../data/articles.ts'

export default function TrendingList() {
  const trending = articles.filter(a => a.isTrending).slice(0, 5)

  return (
    <div className="bg-surface rounded-lg border border-border p-5">
      <h3 className="text-[13px] font-bold text-dark mb-4 tracking-wide">הנקראים ביותר</h3>
      <ul className="space-y-3">
        {trending.map((article, i) => (
          <li key={article.id}>
            <Link
              to={`/article/${article.slug}`}
              className="flex items-start gap-3 group"
            >
              <span className="flex-shrink-0 text-[13px] font-inter font-bold text-accent-dark mt-0.5">
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
