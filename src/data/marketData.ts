import type { MarketItem } from '../types/index.ts'

export const marketData: MarketItem[] = [
  { name: 'ת"א 125', value: 4028.86, change: -0.43, direction: 'down' },
  { name: 'ת"א 35', value: 4051.87, change: -0.38, direction: 'down' },
  { name: 'S&P 500', value: 690.63, change: 1.92, direction: 'up' },
  { name: 'דאו ג\'ונס', value: 501.04, change: 2.48, direction: 'up' },
  { name: 'נאסד"ק 100', value: 609.66, change: 2.12, direction: 'up' },
  { name: 'דולר/שקל', value: 3.12, change: 0, direction: 'flat' },
  { name: 'אירו/שקל', value: 3.69, change: 0, direction: 'flat' },
]
