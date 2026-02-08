import { useState } from 'react'
import { qaItems, getQAByCategory, searchQA } from '../data/qa.ts'
import Breadcrumbs from '../components/ui/Breadcrumbs.tsx'
import Sidebar from '../components/layout/Sidebar.tsx'

const qaCategories = [...new Set(qaItems.map(q => q.category))]

export default function QAPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredItems = searchQuery
    ? searchQA(searchQuery)
    : activeCategory
    ? getQAByCategory(activeCategory)
    : qaItems

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={[{ label: 'שאלות ותשובות' }]} />

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-dark mb-2">שאלות ותשובות</h1>
        <p className="text-text-secondary text-sm mb-6">
          תשובות לשאלות הנפוצות ביותר על השקעות, מיסוי וניהול פיננסי
        </p>

        {/* Search */}
        <div className="relative max-w-md mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setActiveCategory(null) }}
            placeholder="חיפוש שאלה..."
            className="w-full px-4 py-2.5 pr-10 bg-surface border border-border rounded-lg text-sm text-dark placeholder:text-text-tertiary focus:outline-none focus:border-border-dark transition-colors"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveCategory(null); setSearchQuery('') }}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-medium border transition-colors ${
              !activeCategory && !searchQuery
                ? 'border-dark bg-dark text-white'
                : 'border-border text-text-secondary hover:border-border-dark'
            }`}
          >
            הכל
          </button>
          {qaCategories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSearchQuery('') }}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium border transition-colors ${
                activeCategory === cat
                  ? 'border-dark bg-dark text-white'
                  : 'border-border text-text-secondary hover:border-border-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          {searchQuery && (
            <p className="text-sm text-text-secondary mb-4">
              {filteredItems.length > 0
                ? `נמצאו ${filteredItems.length} תוצאות`
                : 'לא נמצאו תוצאות'}
            </p>
          )}

          <div className="space-y-2">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="flex items-center justify-between w-full p-5 text-right hover:bg-bg-subtle transition-colors"
                >
                  <span className="text-[14px] font-medium text-dark flex-1">{item.question}</span>
                  <svg
                    className={`w-4 h-4 text-text-tertiary flex-shrink-0 mr-4 transition-transform ${
                      expandedId === item.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedId === item.id && (
                  <div className="px-5 pb-5 border-t border-border">
                    <p className="text-[14px] text-text-secondary leading-[1.8] pt-4">
                      {item.answer}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-[11px] text-text-tertiary border border-border rounded-full px-2 py-0.5">
                        {item.category}
                      </span>
                      {item.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[11px] text-text-tertiary">#{tag}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
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
