import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col leading-tight">
              <span className="text-dark font-bold tracking-tight">שִׁקְלוֹן</span>
              <span className="text-text-tertiary text-[10px] font-normal">שקל וחשבון — הדרך למיליון</span>
            </div>
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/encyclopedia" className="footer-link text-[13px] text-text-secondary hover:text-dark">
              אנציקלופדיה
            </Link>
            <Link to="/guides" className="footer-link text-[13px] text-text-secondary hover:text-dark">
              מדריכים
            </Link>
            <Link to="/tools" className="footer-link text-[13px] text-text-secondary hover:text-dark">
              כלים
            </Link>
            <Link to="/qa" className="footer-link text-[13px] text-text-secondary hover:text-dark">
              שאלות ותשובות
            </Link>
            <Link to="/category/stock-market" className="footer-link text-[13px] text-text-secondary hover:text-dark">
              חדשות
            </Link>
            <span className="footer-link text-[13px] text-text-secondary hover:text-dark cursor-pointer">אודות</span>
            <span className="footer-link text-[13px] text-text-secondary hover:text-dark cursor-pointer">צור קשר</span>
          </nav>
        </div>

        {/* Gold accent divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gradient-to-l from-border to-transparent" />
          <span className="text-accent/30 text-xs font-inter">₪</span>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </div>

        {/* Bottom row */}
        <div className="text-center">
          <p className="text-xs text-text-tertiary">
            &#x00A9; {new Date().getFullYear()} שִׁקְלוֹן — אתר לדוגמה בלבד. התוכן אינו ייעוץ פיננסי.
          </p>
        </div>
      </div>
    </footer>
  )
}
