import type { Category } from '../types/index.ts'

export const categories: Category[] = [
  {
    slug: 'stock-market',
    name: 'חדשות שווקים',
    description: 'חדשות ועדכונים מוול סטריט, הבורסות הבינלאומיות ושוקי ההון בעולם',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
  },
  {
    slug: 'insurance',
    name: 'דוחות חברות',
    description: 'דוחות כספיים ותוצאות רבעוניות של חברות מובילות בעולם',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
  },
  {
    slug: 'small-business',
    name: 'עולם שמשפיע עלינו',
    description: 'מאקרו-כלכלה גלובלית, בנקים מרכזיים, אנרגיה, סחורות וגיאופוליטיקה',
    color: 'text-sky-600',
    bgColor: 'bg-sky-50',
  },
  {
    slug: 'real-estate',
    name: 'ת״א היום',
    description: 'חדשות מהבורסה בתל אביב, מניות ישראליות ושוק ההון המקומי',
    color: 'text-stone-600',
    bgColor: 'bg-stone-50',
  },
  {
    slug: 'savings',
    name: 'בנק ישראל / מדד',
    description: 'החלטות ריבית, מדד המחירים לצרכן, אינפלציה ומדיניות מוניטרית',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    slug: 'kupot-gemel',
    name: 'קופות גמל',
    description: 'חיסכון פנסיוני, קופות גמל להשקעה והשוואת מסלולים',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    slug: 'tax-benefits',
    name: 'מסים והטבות',
    description: 'הטבות מס, זיכויים ומענקים למשפחות ולעצמאים',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
  },
  {
    slug: 'gemachim',
    name: 'גמ"חים',
    description: 'גמ"חים קהילתיים, הלוואות ללא ריבית ופתרונות מימון',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-50',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}
