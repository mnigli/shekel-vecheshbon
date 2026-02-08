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
    <div className="bg-surface rounded-lg border border-border p-5">
      <h3 className="text-[13px] font-bold text-dark mb-1 tracking-wide">הירשמו לעדכונים</h3>
      <p className="text-[12px] text-text-tertiary mb-4">
        חדשות פיננסיות ישירות למייל
      </p>
      {submitted ? (
        <div className="border border-green-200 rounded-lg p-3 text-center">
          <p className="text-green-600 text-[13px]">נרשמתם בהצלחה</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="כתובת אימייל"
            className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-[13px] text-dark placeholder-text-tertiary focus:outline-none focus:border-border-dark"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-dark text-white font-medium rounded-lg text-[13px] hover:bg-dark-soft transition-colors"
          >
            הרשמה
          </button>
        </form>
      )}
    </div>
  )
}
