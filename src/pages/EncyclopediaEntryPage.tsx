import { Link, useParams } from 'react-router-dom'
import { getEntryBySlug, encyclopediaSections, getEntriesBySection } from '../data/encyclopedia.ts'
import Breadcrumbs from '../components/ui/Breadcrumbs.tsx'
import Sidebar from '../components/layout/Sidebar.tsx'

export default function EncyclopediaEntryPage() {
  const { slug } = useParams<{ slug: string }>()
  const entry = getEntryBySlug(slug || '')

  if (!entry) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-xl font-bold text-dark mb-3">ערך לא נמצא</h2>
        <p className="text-text-secondary text-sm">הערך שחיפשתם אינו קיים באנציקלופדיה.</p>
        <Link to="/encyclopedia" className="text-accent text-sm mt-4 inline-block hover:underline">
          חזרה לאנציקלופדיה
        </Link>
      </div>
    )
  }

  const section = encyclopediaSections.find(s => s.id === entry.section)
  const sectionEntries = getEntriesBySection(entry.section).filter(e => e.id !== entry.id).slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs
        items={[
          { label: 'אנציקלופדיה', to: '/encyclopedia' },
          ...(section ? [{ label: section.title, to: `/encyclopedia/${section.id}` }] : []),
          { label: entry.term },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <article className="bg-surface rounded-lg border border-border p-8">
            <h1 className="text-2xl font-bold text-dark mb-2">{entry.term}</h1>
            <p className="text-text-secondary text-sm mb-6 border-b border-border pb-6">
              {entry.shortDefinition}
            </p>

            <div className="space-y-4">
              {entry.content.map((paragraph, i) => (
                <p key={i} className="text-[15px] text-text leading-[1.8]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
              {entry.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[12px] text-text-tertiary border border-border rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Related terms */}
            {entry.relatedTerms.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-[13px] font-bold text-dark mb-3">ערכים קשורים</h3>
                <div className="flex flex-wrap gap-2">
                  {entry.relatedTerms.map(slug => {
                    const related = getEntryBySlug(slug)
                    if (!related) return null
                    return (
                      <Link
                        key={slug}
                        to={`/encyclopedia/entry/${slug}`}
                        className="text-[13px] text-accent hover:underline"
                      >
                        {related.term}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </article>

          {/* More from this section */}
          {sectionEntries.length > 0 && (
            <section className="mt-10">
              <h2 className="text-[15px] font-bold text-dark mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-accent inline-block" />
                עוד ב{section?.title}
              </h2>
              <div className="space-y-2">
                {sectionEntries.map(e => (
                  <Link
                    key={e.id}
                    to={`/encyclopedia/entry/${e.slug}`}
                    className="block border border-border rounded-lg p-4 hover:border-border-dark transition-colors group"
                  >
                    <h3 className="text-[14px] font-bold text-dark group-hover:text-accent transition-colors">
                      {e.term}
                    </h3>
                    <p className="text-[12px] text-text-secondary mt-0.5">{e.shortDefinition}</p>
                  </Link>
                ))}
              </div>
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
