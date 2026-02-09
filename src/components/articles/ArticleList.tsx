import type { Article } from '../../types/index.ts'
import ArticleCard from './ArticleCard.tsx'

interface ArticleListProps {
  articles: Article[]
  columns?: 2 | 3
}

export default function ArticleList({ articles, columns = 2 }: ArticleListProps) {
  const gridCols = columns === 3
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2'

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 text-text-tertiary">
        <p className="text-lg">לא נמצאו כתבות</p>
      </div>
    )
  }

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} index={index} />
      ))}
    </div>
  )
}
