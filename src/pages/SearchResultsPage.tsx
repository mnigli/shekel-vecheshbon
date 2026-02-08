import { useSearchParams } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch.ts'
import ArticleList from '../components/articles/ArticleList.tsx'
import Sidebar from '../components/layout/Sidebar.tsx'
import Breadcrumbs from '../components/ui/Breadcrumbs.tsx'

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = useSearch(query)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: `חיפוש: "${query}"` }]} />

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-dark mb-2">
          תוצאות חיפוש: &ldquo;{query}&rdquo;
        </h1>
        <p className="text-text-secondary text-sm">
          {results.length > 0
            ? `נמצאו ${results.length} תוצאות`
            : 'לא נמצאו תוצאות מתאימות'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <ArticleList articles={results} columns={3} />
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
