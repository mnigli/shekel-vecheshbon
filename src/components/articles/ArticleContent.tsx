import type { Article } from '../../types/index.ts'
import { getAuthorById } from '../../data/authors.ts'
import CategoryTag from './CategoryTag.tsx'

interface ArticleContentProps {
  article: Article
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const author = getAuthorById(article.authorId)
  const date = new Date(article.publishedAt).toLocaleDateString('he-IL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="p-6 md:p-8">
      <div className="mb-4">
        <CategoryTag slug={article.category} size="md" />
      </div>
      <h1 className="text-2xl font-bold text-dark leading-relaxed mb-5">
        {article.title}
      </h1>
      <div className="flex items-center gap-3 text-[13px] text-text-secondary mb-8 pb-8 border-b border-border">
        {author && (
          <>
            <span className="font-medium text-dark">{author.name}</span>
            <span className="text-text-tertiary">&#xB7;</span>
            <span>{author.role}</span>
          </>
        )}
        <span className="text-text-tertiary">&#xB7;</span>
        <span className="font-inter">{date}</span>
      </div>
      <p className="text-base text-text-secondary leading-loose mb-8 font-medium">
        {article.description}
      </p>
      <div className="space-y-5">
        {article.content.map((paragraph, i) => (
          <p key={i} className="text-[15px] text-dark/80 leading-loose">
            {paragraph}
          </p>
        ))}
      </div>
      {article.tags.length > 0 && (
        <div className="mt-10 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="text-[11px] text-text-tertiary border border-border px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
