import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  className?: string
  onSearch?: () => void
}

export default function SearchBar({ className = '', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      onSearch?.()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="חיפוש..."
        className="w-full pr-3 pl-9 py-1.5 rounded-md border border-white/10 bg-white/5 text-[13px] text-white placeholder-white/30 focus:outline-none focus:border-white/20"
      />
      <button
        type="submit"
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  )
}
