import { Link } from 'react-router-dom'
import type { Article } from '../../types/index.ts'
import { getAuthorById } from '../../data/authors.ts'
import CategoryTag from './CategoryTag.tsx'
import IconPlaceholder from '../ui/IconPlaceholder.tsx'

interface ArticleCardProps {
  article: Article
  index?: number
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const author = getAuthorById(article.authorId)
  const staggerClass = `stagger-${Math.min(index + 1, 8)}`

  return (
    <article className={`bg-surface rounded-xl border border-border overflow-hidden card-hover group animate-fade-in-up ${staggerClass}`}>
      <Link to={`/article/${article.slug}`}>
        <IconPlaceholder type={article.imageType} size="sm" />
      </Link>
      <div className="p-5">
        <div className="mb-3">
          <CategoryTag slug={article.category} />
        </div>
        <Link to={`/article/${article.slug}`}>
          <h3 className="text-[15px] font-bold text-dark leading-relaxed mb-2 group-hover:text-accent-dark transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="text-[13px] text-text-secondary leading-relaxed mb-4 line-clamp-2">
          {article.description}
        </p>
        <div className="flex items-center justify-between text-[12px] text-text-tertiary pt-3 border-t border-border/50">
          {author && <span className="font-medium">{author.name}</span>}
          <span className="font-inter">{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  )
}
