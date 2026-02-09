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
    <Link to={`/article/${article.slug}`} className="block group animate-fade-in-up">
      <article className="hero-gradient rounded-xl overflow-hidden">
        <div className="relative z-10 p-6 md:p-8 lg:px-10 lg:py-8">
          <div className="mb-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CategoryTag slug={article.category} size="md" />
          </div>
          <h2
            className="text-[22px] md:text-[26px] lg:text-[28px] font-bold text-white leading-snug mb-3 group-hover:text-accent-light transition-colors duration-500"
            style={{ animationDelay: '300ms' }}
          >
            {article.title}
          </h2>
          <p
            className="text-white/45 text-[14px] md:text-[15px] leading-relaxed mb-5 max-w-2xl animate-fade-in"
            style={{ animationDelay: '400ms' }}
          >
            {article.description}
          </p>
          <div
            className="flex items-center gap-3 text-[13px] text-white/25 animate-fade-in"
            style={{ animationDelay: '500ms' }}
          >
            {author && (
              <>
                <span className="text-white/40 font-medium">{author.name}</span>
                <span className="text-accent/40">&#x2022;</span>
              </>
            )}
            <span className="font-inter">{date}</span>
          </div>

          {/* Decorative corner accent */}
          <div className="absolute top-0 left-0 w-24 h-24 opacity-[0.03] pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <path d="M0 0 L100 0 L0 100 Z" fill="currentColor" className="text-accent" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
