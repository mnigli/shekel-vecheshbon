import { Link } from 'react-router-dom'
import { getCategoryBySlug } from '../../data/categories.ts'
import type { CategorySlug } from '../../types/index.ts'

interface CategoryTagProps {
  slug: CategorySlug
  size?: 'sm' | 'md'
}

export default function CategoryTag({ slug, size = 'sm' }: CategoryTagProps) {
  const category = getCategoryBySlug(slug)
  if (!category) return null

  const sizeClasses = size === 'sm'
    ? 'text-[11px] tracking-wide'
    : 'text-[12px] tracking-wide'

  return (
    <Link
      to={`/category/${slug}`}
      className={`inline-block font-medium ${category.color} ${sizeClasses} hover:text-accent-dark transition-colors`}
    >
      {category.name}
    </Link>
  )
}
