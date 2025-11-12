import type { MenuSettings } from "@/types/settings"

export const defaultSettings: MenuSettings = {
  // Typography
  headerText: {
    fontSize: 30,
    fontFamily: "Arial, sans-serif",
    color: "#1f2937",
    fontWeight: "bold",
    alignment: "center",
  },
  categoryTitle: {
    fontSize: 24,
    fontFamily: "Arial, sans-serif",
    color: "#1f2937",
    fontWeight: "bold",
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: "Arial, sans-serif",
    color: "#6b7280",
    fontWeight: "italic",
    show: true,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: "Arial, sans-serif",
    color: "#374151",
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: "Arial, sans-serif",
    color: "#6b7280",
    fontWeight: "normal",
    show: true,
  },
  price: {
    fontSize: 16,
    fontFamily: "Arial, sans-serif",
    color: "#1f2937",
    fontWeight: "normal",
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: "Arial, sans-serif",
    color: "#6b7280",
    fontWeight: "normal",
  },
  sectionTitle: {
    fontSize: 28,
    fontFamily: "Arial, sans-serif",
    color: "#1f2937",
    fontWeight: "bold",
  },

  // Layout
  spacing: {
    categorySpacing: 48,
    itemSpacing: 24,
    sectionPadding: 32,
    logoToHeader: 50,
    headerToSection: 36,
    sectionToCategory: 40,
  },

  // Icons
  iconSize: 20,
  showIcons: true,
  iconStyle: "colored",
  iconBackground: {
    show: false,
    color: "#f3f4f6",
    opacity: 0.8,
  },

  // Page settings
  pageFormat: "a4",
  orientation: "portrait",
  margins: 40,
  layout: {
    columns: 1,
    columnGap: 32,
  },

  // Colors & Theme
  backgroundColor: "#ffffff",
  pageBorders: {
    top: { show: false, thickness: 2, color: "#e5e7eb" },
    bottom: { show: false, thickness: 2, color: "#e5e7eb" },
    left: { show: false, thickness: 2, color: "#e5e7eb" },
    right: { show: false, thickness: 2, color: "#e5e7eb" },
  },
  borderColor: "#e5e7eb",
  showBorders: true,

  // Branding
  branding: {
    showLogo: true,
    logoSize: 60,
    logoPosition: "center",
    logoUrl: "",
    headerText: "Menu",
    topMargin: 48,
  },

  // Section Titles
  sectionTitles: {
    foodSection: "FOOD",
    beverageSection: "BEVERAGES",
    alignment: "center",
  },
  sectionTitleStyle: {
    alignment: "center",
    showLine: false,
    lineType: "straight",
  },

  // Header decorations
  headerDecorations: {
    showLine: false,
    lineType: "none",
    lineThickness: 2,
    lineColor: "#1f2937",
    linePosition: "below",
  },

  // Category title styling
  categoryTitleStyle: {
    alignment: "center",
    showLine: true,
    lineType: "straight",
    lineThickness: 1,
    lineColor: "#1f2937",
    linePosition: "below",
  },

  // Price styling options
  priceStyle: {
    multiPriceLayout: "stacked",
  },
}
