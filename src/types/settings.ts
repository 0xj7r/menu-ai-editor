export interface MenuSettings {
  // Typography
  headerText: {
    fontSize: number
    fontFamily: string
    color: string
    fontWeight: string
    alignment: string
  }
  categoryTitle: {
    fontSize: number
    fontFamily: string
    color: string
    fontWeight: string
  }
  categoryDescription: {
    fontSize: number
    fontFamily: string
    color: string
    fontWeight: string
    show: boolean
  }
  itemTitle: {
    fontSize: number
    fontFamily: string
    color: string
    fontWeight: string
  }
  itemDescription: {
    fontSize: number
    fontFamily: string
    color: string
    fontWeight: string
    show: boolean
  }
  price: {
    fontSize: number
    fontFamily: string
    color: string
    fontWeight: string
  }
  priceLabel: {
    fontSize: number
    fontFamily: string
    color: string
    fontWeight: string
  }
  sectionTitle: {
    fontSize: number
    fontFamily: string
    color: string
    fontWeight: string
  }

  // Layout
  spacing: {
    categorySpacing: number
    itemSpacing: number
    sectionPadding: number
    logoToHeader: number
    headerToSection: number
    sectionToCategory: number
  }

  // Icons
  iconSize: number
  showIcons: boolean
  iconStyle: string
  iconBackground: {
    show: boolean
    color: string
    opacity: number
  }

  // Page settings
  pageFormat: string
  orientation: string
  margins: number
  layout: {
    columns: number
    columnGap: number
  }

  // Colors & Theme
  backgroundColor: string
  pageBorders: {
    top: { show: boolean; thickness: number; color: string }
    bottom: { show: boolean; thickness: number; color: string }
    left: { show: boolean; thickness: number; color: string }
    right: { show: boolean; thickness: number; color: string }
  }
  borderColor: string
  showBorders: boolean

  // Branding
  branding: {
    showLogo: boolean
    logoSize: number
    logoPosition: string
    logoUrl?: string
    headerText: string
    topMargin: number
  }

  // Section Titles
  sectionTitles: {
    foodSection: string
    beverageSection: string
    alignment: string
  }
  sectionTitleStyle: {
    alignment: string
    showLine: boolean
    lineType: string
  }

  // Header decorations
  headerDecorations: {
    showLine: boolean
    lineType: string
    lineThickness: number
    lineColor: string
    linePosition: string
  }

  // Category title styling
  categoryTitleStyle: {
    alignment: string
    showLine: boolean
    lineType: string
    lineThickness: number
    lineColor: string
    linePosition: string
  }

  // Price styling options
  priceStyle: {
    multiPriceLayout: string
  }
}
