import type { Author } from '../types/index.ts'

export const authors: Author[] = [
  { id: 'a1', name: 'יעקב כהן', role: 'כתב כלכלי' },
  { id: 'a2', name: 'מנחם פרידמן', role: 'עורך ראשי' },
  { id: 'a3', name: 'שמואל גולדשטיין', role: 'אנליסט שוק ההון' },
  { id: 'a4', name: 'דוד רוזנברג', role: 'כתב נדל"ן' },
  { id: 'a5', name: 'אברהם וייס', role: 'יועץ מס' },
  { id: 'a6', name: 'חיים ברקוביץ', role: 'כתב עסקים' },
]

export function getAuthorById(id: string): Author | undefined {
  return authors.find(a => a.id === id)
}
