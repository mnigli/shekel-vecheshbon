import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <div className="widget-card animate-slide-in-right" style={{ animationDelay: '300ms' }}>
      <h3 className="text-[13px] font-bold text-dark mb-1 tracking-wide">הירשמו לעדכונים</h3>
      <p className="text-[12px] text-text-tertiary mb-4">
        חדשות פיננסיות ישירות למייל
      </p>
      {submitted ? (
        <div className="border border-green-200 rounded-xl p-3 text-center bg-green-50/50 animate-fade-in">
          <p className="text-green-600 text-[13px] font-medium">נרשמתם בהצלחה ✓</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="כתובת אימייל"
            className="newsletter-input w-full px-3 py-2 rounded-lg border border-border bg-bg text-[13px] text-dark placeholder-text-tertiary focus:outline-none"
            required
          />
          <button
            type="submit"
            className="newsletter-btn w-full py-2 text-white font-medium rounded-lg text-[13px]"
          >
            הרשמה
          </button>
        </form>
      )}
    </div>
  )
}
