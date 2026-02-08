import type { ImageType } from '../../types/index.ts'
import CategoryIcon from '../icons/CategoryIcons.tsx'

interface IconPlaceholderProps {
  type: ImageType
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { container: 'h-28', icon: 'w-10 h-10' },
  md: { container: 'h-36', icon: 'w-14 h-14' },
  lg: { container: 'h-48', icon: 'w-20 h-20' },
}

export default function IconPlaceholder({ type, size = 'md' }: IconPlaceholderProps) {
  const { container, icon } = sizeMap[size]

  return (
    <div className={`${container} bg-bg-subtle flex items-center justify-center`}>
      <div className="opacity-30">
        <CategoryIcon type={type} className={icon} />
      </div>
    </div>
  )
}
