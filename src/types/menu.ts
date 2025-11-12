export interface MenuItem {
  id: number
  name: string
  prices: Array<{ label: string; value: number }>
  description: string
  icons: string[]
}

export interface MenuCategory {
  id: number
  name: string
  description: string
  type: "food" | "drink"
  items: MenuItem[]
}

export interface PageBreak {
  id: string
  type: "page-break"
  position: "before" | "after"
}

export interface Menu {
  categories: MenuCategory[]
  pageBreaks: PageBreak[]
}
