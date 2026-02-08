import { useMemo } from 'react'
import { articles } from '../data/articles.ts'

export function useSearch(query: string) {
  return useMemo(() => {
    if (!query.trim()) return []

    const q = query.trim().toLowerCase()

    return articles.filter(article =>
      article.title.includes(q) ||
      article.description.includes(q) ||
      article.tags.some(tag => tag.includes(q))
    )
  }, [query])
}
