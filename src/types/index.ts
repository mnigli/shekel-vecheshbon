export type CategorySlug =
  | 'stock-market'
  | 'real-estate'
  | 'gemachim'
  | 'insurance'
  | 'tax-benefits'
  | 'small-business'
  | 'kupot-gemel'
  | 'savings'

export type ImageType =
  | 'chart'
  | 'building'
  | 'coins'
  | 'document'
  | 'handshake'
  | 'calculator'
  | 'piggybank'
  | 'briefcase'

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  color: string
  bgColor: string
}

export interface Author {
  id: string
  name: string
  role: string
}

export interface Article {
  id: string
  slug: string
  title: string
  description: string
  content: string[]
  category: CategorySlug
  authorId: string
  publishedAt: string
  imageType: ImageType
  isFeatured: boolean
  isTrending: boolean
  tags: string[]
}

export interface MarketItem {
  name: string
  value: number
  change: number
  direction: 'up' | 'down' | 'flat'
}

// --- Encyclopedia ---

export type EncyclopediaSectionId =
  | 'investment-basics'
  | 'israeli-stocks'
  | 'etfs-funds'
  | 'bonds-interest'
  | 'financial-reports'
  | 'macro-global'
  | 'tax-accounts'
  | 'investment-kashrut'

export interface EncyclopediaSection {
  id: EncyclopediaSectionId
  title: string
  description: string
  icon: string
}

export interface EncyclopediaEntry {
  id: string
  slug: string
  term: string
  shortDefinition: string
  content: string[]
  section: EncyclopediaSectionId
  relatedTerms: string[]
  tags: string[]
}

// --- Guides ---

export type GuideTrack =
  | 'beginners'
  | 'reports'
  | 'global'
  | 'values'

export interface GuideTrackInfo {
  id: GuideTrack
  title: string
  description: string
  icon: string
}

export interface Guide {
  id: string
  slug: string
  title: string
  description: string
  content: string[]
  track: GuideTrack
  order: number
  readTime: number
  tags: string[]
}

// --- Tools ---

export interface FinancialTool {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  type: 'return-calculator' | 'compound-interest' | 'duration-calculator'
}

// --- Q&A ---

export interface QAItem {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}
