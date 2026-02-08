import type { FinancialTool } from '../types/index.ts'

export const financialTools: FinancialTool[] = [
  {
    id: 'tool-1',
    slug: 'return-calculator',
    title: 'מחשבון תשואה',
    description: 'חשב את התשואה על ההשקעה שלך לאורך זמן. הכנס סכום השקעה, תקופה ושיעור תשואה צפוי וקבל תמונה ברורה של הרווח הצפוי.',
    icon: '📈',
    type: 'return-calculator',
  },
  {
    id: 'tool-2',
    slug: 'compound-interest',
    title: 'מחשבון ריבית דריבית',
    description: 'גלה את הכוח של ריבית דריבית. הכנס סכום התחלתי, הפקדה חודשית, שיעור ריבית ותקופה וצפה כיצד הכסף שלך גדל באופן מעריכי.',
    icon: '💹',
    type: 'compound-interest',
  },
  {
    id: 'tool-3',
    slug: 'duration-calculator',
    title: 'מחשבון משך מח"מ',
    description: 'חשב את המח"מ (משך חיים ממוצע) של אגרת חוב. כלי חיוני להבנת רגישות האג"ח לשינויים בריבית ולניהול סיכונים בתיק ההשקעות.',
    icon: '⏱️',
    type: 'duration-calculator',
  },
]

export function getToolBySlug(slug: string): FinancialTool | undefined {
  return financialTools.find((tool) => tool.slug === slug)
}
