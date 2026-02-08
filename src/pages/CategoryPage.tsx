import { useParams } from 'react-router-dom'
import { useArticles } from '../hooks/useArticles.ts'
import { getCategoryBySlug } from '../data/categories.ts'
import type { CategorySlug } from '../types/index.ts'
import ArticleList from '../components/articles/ArticleList.tsx'
import Sidebar from '../components/layout/Sidebar.tsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.tsx'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const category = getCategoryBySlug(slug || '')
  const catArticles = useArticles(slug as CategorySlug)

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-xl font-bold text-dark mb-3">קטגוריה לא נמצאה</h2>
        <p className="text-text-secondary text-sm">הקטגוריה שחיפשתם אינה קיימת.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: category.name }]} />

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-dark mb-2">{category.name}</h1>
        <p className="text-text-secondary text-sm">{category.description}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <ArticleList articles={catArticles} columns={3} />
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
