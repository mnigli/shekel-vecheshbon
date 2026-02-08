import { Link, useParams } from 'react-router-dom'
import { guideTracks, getGuidesByTrack } from '../data/guides.ts'
import type { GuideTrack } from '../types/index.ts'
import Breadcrumbs from '../components/ui/Breadcrumbs.tsx'
import Sidebar from '../components/layout/Sidebar.tsx'

export default function GuidesPage() {
  const { trackId } = useParams<{ trackId: string }>()
  const activeTrack = trackId as GuideTrack | undefined
  const trackInfo = guideTracks.find(t => t.id === activeTrack)
  const trackGuides = activeTrack ? getGuidesByTrack(activeTrack) : []

  const breadcrumbs = trackInfo
    ? [{ label: 'מדריכים', to: '/guides' }, { label: trackInfo.title }]
    : [{ label: 'מדריכים' }]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-dark mb-2">
          {trackInfo ? trackInfo.title : 'מדריכים'}
        </h1>
        <p className="text-text-secondary text-sm">
          {trackInfo
            ? trackInfo.description
            : 'מדריכים מקיפים שיעזרו לך להבין את עולם הפיננסים — מהצעד הראשון ועד לניתוח מתקדם'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          {!activeTrack ? (
            /* Track cards */
            <div className="space-y-6">
              {guideTracks.map(track => {
                const guides = getGuidesByTrack(track.id)
                return (
                  <div key={track.id} className="border border-border rounded-lg p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <span className="text-2xl">{track.icon}</span>
                      <div>
                        <Link
                          to={`/guides/${track.id}`}
                          className="text-[15px] font-bold text-dark hover:text-accent transition-colors"
                        >
                          {track.title}
                        </Link>
                        <p className="text-[13px] text-text-secondary mt-0.5">
                          {track.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {guides.map((guide, i) => (
                        <Link
                          key={guide.id}
                          to={`/guide/${guide.slug}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-subtle transition-colors group"
                        >
                          <span className="text-[13px] font-inter font-medium text-text-tertiary w-6 text-center">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[14px] text-dark group-hover:text-accent transition-colors truncate">
                              {guide.title}
                            </h4>
                          </div>
                          <span className="text-[11px] text-text-tertiary whitespace-nowrap">
                            {guide.readTime} דק׳
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* Guides list for specific track */
            <div className="space-y-3">
              {trackGuides.map((guide, i) => (
                <Link
                  key={guide.id}
                  to={`/guide/${guide.slug}`}
                  className="block border border-border rounded-lg p-5 hover:border-border-dark transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-lg font-inter font-bold text-text-tertiary mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold text-dark group-hover:text-accent transition-colors mb-1">
                        {guide.title}
                      </h3>
                      <p className="text-[13px] text-text-secondary leading-relaxed mb-2">
                        {guide.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-text-tertiary">
                        <span>{guide.readTime} דק׳ קריאה</span>
                        {guide.tags.slice(0, 2).map(tag => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
