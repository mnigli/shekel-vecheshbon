import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-accent font-bold font-inter">₪</span>
            <span className="text-dark font-bold">שקל וחשבון</span>
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/encyclopedia" className="text-[13px] text-text-secondary hover:text-dark transition-colors">
              אנציקלופדיה
            </Link>
            <Link to="/guides" className="text-[13px] text-text-secondary hover:text-dark transition-colors">
              מדריכים
            </Link>
            <Link to="/tools" className="text-[13px] text-text-secondary hover:text-dark transition-colors">
              כלים
            </Link>
            <Link to="/qa" className="text-[13px] text-text-secondary hover:text-dark transition-colors">
              שאלות ותשובות
            </Link>
            <Link to="/category/stock-market" className="text-[13px] text-text-secondary hover:text-dark transition-colors">
              חדשות
            </Link>
            <span className="text-[13px] text-text-secondary hover:text-dark transition-colors cursor-pointer">אודות</span>
            <span className="text-[13px] text-text-secondary hover:text-dark transition-colors cursor-pointer">צור קשר</span>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="border-t border-border pt-4 text-center">
          <p className="text-xs text-text-tertiary">
            &#x00A9; {new Date().getFullYear()} שקל וחשבון — אתר לדוגמה בלבד. התוכן אינו ייעוץ פיננסי.
          </p>
        </div>
      </div>
    </footer>
  )
}
