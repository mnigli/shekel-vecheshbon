import type { Category } from '../types/index.ts'

export const categories: Category[] = [
  {
    slug: 'stock-market',
    name: 'שוק ההון',
    description: 'חדשות ועדכונים מהבורסה בתל אביב ומהשווקים הבינלאומיים',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
  },
  {
    slug: 'real-estate',
    name: 'נדל"ן',
    description: 'מגמות בשוק הנדל"ן, פרויקטים חדשים ומחירי דירות',
    color: 'text-stone-600',
    bgColor: 'bg-stone-50',
  },
  {
    slug: 'gemachim',
    name: 'גמ"חים',
    description: 'גמ"חים קהילתיים, הלוואות ללא ריבית ופתרונות מימון',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
  },
  {
    slug: 'insurance',
    name: 'ביטוח',
    description: 'ביטוחי בריאות, חיים ורכוש — המדריך המלא',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
  },
  {
    slug: 'tax-benefits',
    name: 'מסים והטבות',
    description: 'הטבות מס, זיכויים ומענקים למשפחות ולעצמאים',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
  {
    slug: 'small-business',
    name: 'עסקים קטנים',
    description: 'ייעוץ לפתיחת עסק, ניהול וצמיחה עסקית',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
  },
  {
    slug: 'kupot-gemel',
    name: 'קופות גמל',
    description: 'חיסכון פנסיוני, קופות גמל להשקעה והשוואת מסלולים',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    slug: 'savings',
    name: 'חיסכון',
    description: 'טיפים לחיסכון, ניהול תקציב משפחתי וחיסכון חכם',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}
