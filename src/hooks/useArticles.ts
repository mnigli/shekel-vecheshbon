import { useMemo } from 'react'
import { articles } from '../data/articles.ts'
import type { CategorySlug } from '../types/index.ts'

export function useArticles(category?: CategorySlug) {
  return useMemo(() => {
    const sorted = [...articles].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    if (category) {
      return sorted.filter(a => a.category === category)
    }
    return sorted
  }, [category])
}

export function useFeaturedArticle() {
  return useMemo(() => {
    return articles.find(a => a.isFeatured) || articles[0]
  }, [])
}

export function useArticleBySlug(slug: string) {
  return useMemo(() => {
    return articles.find(a => a.slug === slug)
  }, [slug])
}

export function useRelatedArticles(articleId: string, category: CategorySlug, limit = 4) {
  return useMemo(() => {
    return articles
      .filter(a => a.id !== articleId && a.category === category)
      .slice(0, limit)
  }, [articleId, category, limit])
}
