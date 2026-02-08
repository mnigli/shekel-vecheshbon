import { Link } from 'react-router-dom'
import type { Article } from '../../types/index.ts'
import { getAuthorById } from '../../data/authors.ts'
import CategoryTag from './CategoryTag.tsx'

interface HeroArticleProps {
  article: Article
}

export default function HeroArticle({ article }: HeroArticleProps) {
  const author = getAuthorById(article.authorId)
  const date = new Date(article.publishedAt).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Link to={`/article/${article.slug}`} className="block group">
      <article className="relative bg-dark rounded-lg overflow-hidden border-r-4 border-accent">
        <div className="p-8 md:p-12 lg:p-16">
          <div className="mb-4">
            <CategoryTag slug={article.category} size="md" />
          </div>
          <h2 className="text-2xl md:text-[28px] font-bold text-white leading-relaxed mb-4 group-hover:text-accent-light transition-colors">
            {article.title}
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-6 max-w-2xl">
            {article.description}
          </p>
          <div className="flex items-center gap-3 text-[13px] text-white/30">
            {author && (
              <>
                <span className="text-white/50">{author.name}</span>
                <span>&#xB7;</span>
              </>
            )}
            <span>{date}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
