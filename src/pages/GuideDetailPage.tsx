import { Link, useParams } from 'react-router-dom'
import { getGuideBySlug, guideTracks, getGuidesByTrack } from '../data/guides.ts'
import Breadcrumbs from '../components/ui/Breadcrumbs.tsx'
import Sidebar from '../components/layout/Sidebar.tsx'

export default function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const guide = getGuideBySlug(slug || '')

  if (!guide) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-xl font-bold text-dark mb-3">מדריך לא נמצא</h2>
        <p className="text-text-secondary text-sm">המדריך שחיפשתם אינו קיים.</p>
        <Link to="/guides" className="text-accent text-sm mt-4 inline-block hover:underline">
          חזרה למדריכים
        </Link>
      </div>
    )
  }

  const track = guideTracks.find(t => t.id === guide.track)
  const trackGuides = getGuidesByTrack(guide.track)
  const currentIndex = trackGuides.findIndex(g => g.id === guide.id)
  const prevGuide = currentIndex > 0 ? trackGuides[currentIndex - 1] : null
  const nextGuide = currentIndex < trackGuides.length - 1 ? trackGuides[currentIndex + 1] : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs
        items={[
          { label: 'מדריכים', to: '/guides' },
          ...(track ? [{ label: track.title, to: `/guides/${track.id}` }] : []),
          { label: guide.title },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <article className="bg-surface rounded-lg border border-border p-8">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-4 text-[12px] text-text-tertiary">
              {track && (
                <Link to={`/guides/${track.id}`} className="hover:text-accent transition-colors">
                  {track.title}
                </Link>
              )}
              <span>·</span>
              <span>{guide.readTime} דק׳ קריאה</span>
              <span>·</span>
              <span>מדריך {currentIndex + 1} מתוך {trackGuides.length}</span>
            </div>

            <h1 className="text-2xl font-bold text-dark mb-6">{guide.title}</h1>
            <p className="text-text-secondary text-sm mb-8 border-b border-border pb-6">
              {guide.description}
            </p>

            <div className="space-y-4">
              {guide.content.map((paragraph, i) => (
                <p key={i} className="text-[15px] text-text leading-[1.8]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
              {guide.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[12px] text-text-tertiary border border-border rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              {prevGuide ? (
                <Link
                  to={`/guide/${prevGuide.slug}`}
                  className="group flex items-center gap-2 text-sm text-text-secondary hover:text-dark transition-colors"
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="group-hover:text-accent transition-colors">{prevGuide.title}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextGuide ? (
                <Link
                  to={`/guide/${nextGuide.slug}`}
                  className="group flex items-center gap-2 text-sm text-text-secondary hover:text-dark transition-colors"
                >
                  <span className="group-hover:text-accent transition-colors">{nextGuide.title}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </article>
        </div>

        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="lg:sticky lg:top-28">
            {/* Track progress sidebar */}
            <div className="border border-border rounded-lg p-5 mb-6">
              <h3 className="text-[13px] font-bold text-dark mb-3">{track?.title}</h3>
              <div className="space-y-1">
                {trackGuides.map((g, i) => (
                  <Link
                    key={g.id}
                    to={`/guide/${g.slug}`}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[12px] transition-colors ${
                      g.id === guide.id
                        ? 'bg-bg-subtle text-dark font-medium'
                        : 'text-text-secondary hover:text-dark'
                    }`}
                  >
                    <span className="font-inter text-text-tertiary w-4">{i + 1}</span>
                    <span className="truncate">{g.title}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
