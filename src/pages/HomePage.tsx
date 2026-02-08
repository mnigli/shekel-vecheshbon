import { Link } from 'react-router-dom'
import { useArticles, useFeaturedArticle } from '../hooks/useArticles.ts'
import { categories } from '../data/categories.ts'
import HeroArticle from '../components/articles/HeroArticle.tsx'
import ArticleList from '../components/articles/ArticleList.tsx'
import Sidebar from '../components/layout/Sidebar.tsx'

export default function HomePage() {
  const allArticles = useArticles()
  const featured = useFeaturedArticle()
  const latestArticles = allArticles.filter(a => a.id !== featured.id).slice(0, 6)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <section className="mb-12">
        <HeroArticle article={featured} />
      </section>

      {/* Main content + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          {/* Latest */}
          <section className="mb-14">
            <h2 className="text-[15px] font-bold text-dark mb-6 tracking-wide flex items-center gap-3">
              <span className="w-5 h-px bg-accent inline-block" />
              חדשות אחרונות
            </h2>
            <ArticleList articles={latestArticles} />
          </section>

          {/* Category sections */}
          {categories.slice(0, 4).map(cat => {
            const catArticles = allArticles.filter(a => a.category === cat.slug).slice(0, 4)
            if (catArticles.length === 0) return null
            return (
              <section key={cat.slug} className="mb-14">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[15px] font-bold text-dark tracking-wide flex items-center gap-3">
                    <span className="w-5 h-px bg-accent inline-block" />
                    {cat.name}
                  </h2>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="text-[12px] text-text-tertiary hover:text-dark transition-colors"
                  >
                    הכל &larr;
                  </Link>
                </div>
                <ArticleList articles={catArticles} />
              </section>
            )
          })}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="lg:sticky lg:top-28">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
