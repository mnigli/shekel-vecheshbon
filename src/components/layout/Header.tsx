import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchBar from '../ui/SearchBar.tsx'

interface NavItem {
  label: string
  to: string
  children?: { label: string; to: string }[]
}

const navItems: NavItem[] = [
  { label: 'בית', to: '/' },
  { label: 'חדשות', to: '/category/stock-market' },
  { label: 'ת״א היום', to: '/category/real-estate' },
  { label: 'בנק ישראל / מדד', to: '/category/savings' },
  { label: 'דוחות', to: '/category/insurance' },
  { label: 'עולם שמשפיע עלינו', to: '/category/small-business' },
  {
    label: 'מדריכים',
    to: '/guides',
    children: [
      { label: 'מתחילים', to: '/guides/beginners' },
      { label: 'להבין דוחות', to: '/guides/reports' },
      { label: 'ישראל + עולם', to: '/guides/global' },
      { label: 'ערכים ומשמעת', to: '/guides/values' },
    ],
  },
  {
    label: 'אנציקלופדיה',
    to: '/encyclopedia',
    children: [
      { label: 'יסודות ההשקעה', to: '/encyclopedia/investment-basics' },
      { label: 'מניות ומדדים', to: '/encyclopedia/israeli-stocks' },
      { label: 'תעודות סל וקרנות', to: '/encyclopedia/etfs-funds' },
      { label: 'אג״ח וריבית', to: '/encyclopedia/bonds-interest' },
      { label: 'דוחות כספיים', to: '/encyclopedia/financial-reports' },
      { label: 'מאקרו וגלובלי', to: '/encyclopedia/macro-global' },
      { label: 'מיסוי וחשבונות', to: '/encyclopedia/tax-accounts' },
      { label: '״כשרות״ השקעות', to: '/encyclopedia/investment-kashrut' },
    ],
  },
  { label: 'כלים', to: '/tools' },
  { label: 'שאלות ותשובות', to: '/qa' },
]

function DropdownMenu({ items, onClose }: { items: { label: string; to: string }[]; onClose: () => void }) {
  return (
    <div className="dropdown-menu absolute top-full right-0 mt-1 w-48 border border-border rounded-xl shadow-lg py-1.5 z-50">
      {items.map(item => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onClose}
          className="block px-4 py-2 text-[13px] text-text-secondary hover:text-dark hover:bg-bg-subtle transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

function NavItemComponent({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive =
    item.to === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(item.to)

  if (item.children) {
    return (
      <div ref={ref} className="relative flex items-center">
        <Link
          to={item.to}
          className={`nav-link px-2.5 py-1 text-[13px] font-medium whitespace-nowrap transition-colors ${
            isActive ? 'text-accent nav-link-active' : 'text-white/50 hover:text-white/80'
          }`}
        >
          {item.label}
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className={`p-0.5 transition-colors ${
            isActive ? 'text-accent' : 'text-white/50 hover:text-white/80'
          }`}
        >
          <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && <DropdownMenu items={item.children} onClose={() => setOpen(false)} />}
      </div>
    )
  }

  return (
    <Link
      to={item.to}
      className={`nav-link px-2.5 py-1 text-[13px] font-medium whitespace-nowrap transition-colors ${
        isActive ? 'text-accent nav-link-active' : 'text-white/50 hover:text-white/80'
      }`}
    >
      {item.label}
    </Link>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  return (
    <header className="bg-dark sticky top-0 z-50 border-b border-white/5 shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex flex-col leading-tight">
              <span className="text-white text-2xl sm:text-3xl font-bold tracking-tight">שִׁקְלוֹן</span>
              <span className="text-white/50 text-[11px] sm:text-xs font-normal tracking-wide">שקל וחשבון — הדרך למיליון</span>
            </div>
          </Link>

          <div className="hidden lg:block w-64">
            <SearchBar />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white/70 hover:text-white p-1.5"
            aria-label="תפריט"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 h-10 -mb-px overflow-x-auto">
          {navItems.map(item => (
            <NavItemComponent key={item.to} item={item} />
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/5 max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-3">
            <SearchBar onSearch={() => setMobileMenuOpen(false)} />
            <nav className="space-y-0.5">
              {navItems.map(item => (
                <div key={item.to}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === item.to ? null : item.to)
                        }
                        className="flex items-center justify-between w-full px-3 py-2 text-white/70 hover:text-white text-sm"
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-3.5 h-3.5 transition-transform ${
                            mobileExpanded === item.to ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileExpanded === item.to && (
                        <div className="pr-4 space-y-0.5">
                          <Link
                            to={item.to}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-1.5 text-white/40 hover:text-white/70 text-[13px]"
                          >
                            הכל
                          </Link>
                          {item.children.map(child => (
                            <Link
                              key={child.to}
                              to={child.to}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block px-3 py-1.5 text-white/40 hover:text-white/70 text-[13px]"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-white/70 hover:text-white text-sm"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
