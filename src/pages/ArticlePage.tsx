import { useParams } from 'react-router-dom'
import { useArticleBySlug, useRelatedArticles } from '../hooks/useArticles.ts'
import { getCategoryBySlug } from '../data/categories.ts'
import ArticleContent from '../components/articles/ArticleContent.tsx'
import ArticleList from '../components/articles/ArticleList.tsx'
import Sidebar from '../components/layout/Sidebar.tsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.tsx'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = useArticleBySlug(slug || '')
  const related = useRelatedArticles(
    article?.id || '',
    article?.category || 'stock-market'
  )
  const category = article ? getCategoryBySlug(article.category) : undefined

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-xl font-bold text-dark mb-3">כתבה לא נמצאה</h2>
        <p className="text-text-secondary text-sm">הכתבה שחיפשתם אינה קיימת.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs
        items={[
          ...(category ? [{ label: category.name, to: `/category/${category.slug}` }] : []),
          { label: article.title },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className="bg-surface rounded-lg border border-border overflow-hidden">
            <ArticleContent article={article} />
          </div>

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="text-[15px] font-bold text-dark mb-6 tracking-wide flex items-center gap-3">
                <span className="w-5 h-px bg-accent inline-block" />
                כתבות קשורות
              </h2>
              <ArticleList articles={related} />
            </section>
          )}
        </div>

        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="lg:sticky lg:top-28">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
