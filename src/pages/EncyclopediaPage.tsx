import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { encyclopediaSections, getEntriesBySection, searchEncyclopedia } from '../data/encyclopedia.ts'
import type { EncyclopediaSectionId } from '../types/index.ts'
import Breadcrumbs from '../components/ui/Breadcrumbs.tsx'
import Sidebar from '../components/layout/Sidebar.tsx'

export default function EncyclopediaPage() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const [searchQuery, setSearchQuery] = useState('')

  const activeSection = sectionId as EncyclopediaSectionId | undefined
  const sectionInfo = encyclopediaSections.find(s => s.id === activeSection)

  const entries = searchQuery
    ? searchEncyclopedia(searchQuery)
    : activeSection
    ? getEntriesBySection(activeSection)
    : []

  const breadcrumbs = sectionInfo
    ? [{ label: 'אנציקלופדיה', to: '/encyclopedia' }, { label: sectionInfo.title }]
    : [{ label: 'אנציקלופדיה' }]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-dark mb-2">
          {sectionInfo ? sectionInfo.title : 'אנציקלופדיה פיננסית'}
        </h1>
        <p className="text-text-secondary text-sm mb-6">
          {sectionInfo
            ? sectionInfo.description
            : 'כל המונחים הפיננסיים שצריך להכיר — מוסברים בשפה פשוטה ונגישה'}
        </p>

        {/* Search */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="חיפוש מונח..."
            className="w-full px-4 py-2.5 pr-10 bg-surface border border-border rounded-lg text-sm text-dark placeholder:text-text-tertiary focus:outline-none focus:border-border-dark transition-colors"
          />
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          {!activeSection && !searchQuery ? (
            /* Section cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {encyclopediaSections.map(section => {
                const count = getEntriesBySection(section.id).length
                return (
                  <Link
                    key={section.id}
                    to={`/encyclopedia/${section.id}`}
                    className="group border border-border rounded-lg p-6 hover:border-border-dark transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{section.icon}</span>
                      <div>
                        <h3 className="text-[15px] font-bold text-dark group-hover:text-accent transition-colors mb-1">
                          {section.title}
                        </h3>
                        <p className="text-[13px] text-text-secondary leading-relaxed mb-2">
                          {section.description}
                        </p>
                        <span className="text-[12px] text-text-tertiary">
                          {count} ערכים
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            /* Entries list */
            <>
              {searchQuery && (
                <p className="text-sm text-text-secondary mb-4">
                  {entries.length > 0
                    ? `נמצאו ${entries.length} תוצאות`
                    : 'לא נמצאו תוצאות'}
                </p>
              )}
              <div className="space-y-3">
                {entries.map(entry => (
                  <Link
                    key={entry.id}
                    to={`/encyclopedia/entry/${entry.slug}`}
                    className="block border border-border rounded-lg p-5 hover:border-border-dark transition-colors group"
                  >
                    <h3 className="text-[15px] font-bold text-dark group-hover:text-accent transition-colors mb-1">
                      {entry.term}
                    </h3>
                    <p className="text-[13px] text-text-secondary leading-relaxed">
                      {entry.shortDefinition}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {entry.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[11px] text-text-tertiary">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </>
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
