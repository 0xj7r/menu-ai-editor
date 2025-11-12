import {
  Type,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Leaf,
  Flame,
  Snowflake,
  Wheat,
  Fish,
  Circle,
  Droplet,
} from "lucide-react"

export const fontOptions = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Times New Roman, serif", label: "Times New Roman" },
  { value: "Helvetica, Arial, sans-serif", label: "Helvetica" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "Trebuchet MS, sans-serif", label: "Trebuchet MS" },
  { value: "Courier New, monospace", label: "Courier New" },
  { value: "Impact, sans-serif", label: "Impact" },
]

export const fontWeightOptions = [
  { value: "normal", label: "Normal", icon: Type },
  { value: "bold", label: "Bold", icon: Bold },
  { value: "italic", label: "Italic", icon: Italic },
]

export const alignmentOptions = [
  { value: "left", label: "Left", icon: AlignLeft },
  { value: "center", label: "Center", icon: AlignCenter },
  { value: "right", label: "Right", icon: AlignRight },
]

export const iconTypes = [
  { key: "vegetarian", label: "Vegetarian", icon: Leaf, color: "#22c55e" },
  { key: "vegan", label: "Vegan", icon: Leaf, color: "#16a34a" },
  { key: "spicy", label: "Spicy", icon: Flame, color: "#ef4444" },
  { key: "frozen", label: "Frozen Ingredients", icon: Snowflake, color: "#3b82f6" },
  { key: "seafood", label: "Seafood", icon: Fish, color: "#0ea5e9" },
  { key: "gluten-free", label: "Gluten Free", icon: Wheat, color: "#22c55e" },
  { key: "contains-nuts", label: "Contains Nuts", icon: Circle, color: "#f59e0b" },
  { key: "contains-eggs", label: "Contains Eggs", icon: Circle, color: "#f59e0b" },
  { key: "dairy-free", label: "Dairy Free", icon: Droplet, color: "#22c55e" },
]

export const getSizeOptions = (textType: string) => {
  switch (textType) {
    case "header":
      return [
        { label: "XS", value: 20 },
        { label: "S", value: 24 },
        { label: "M", value: 30 },
        { label: "L", value: 36 },
        { label: "XL", value: 42 },
      ]
    case "section":
      return [
        { label: "XS", value: 18 },
        { label: "S", value: 22 },
        { label: "M", value: 28 },
        { label: "L", value: 32 },
        { label: "XL", value: 38 },
      ]
    case "category":
      return [
        { label: "XS", value: 16 },
        { label: "S", value: 20 },
        { label: "M", value: 24 },
        { label: "L", value: 28 },
        { label: "XL", value: 32 },
      ]
    case "item":
      return [
        { label: "XS", value: 12 },
        { label: "S", value: 14 },
        { label: "M", value: 18 },
        { label: "L", value: 20 },
        { label: "XL", value: 24 },
      ]
    case "description":
      return [
        { label: "XS", value: 10 },
        { label: "S", value: 12 },
        { label: "M", value: 14 },
        { label: "L", value: 16 },
        { label: "XL", value: 18 },
      ]
    case "price":
      return [
        { label: "XS", value: 12 },
        { label: "S", value: 14 },
        { label: "M", value: 16 },
        { label: "L", value: 18 },
        { label: "XL", value: 20 },
      ]
    case "priceLabel":
      return [
        { label: "XS", value: 10 },
        { label: "S", value: 12 },
        { label: "M", value: 14 },
        { label: "L", value: 16 },
        { label: "XL", value: 18 },
      ]
    default:
      return [
        { label: "XS", value: 12 },
        { label: "S", value: 16 },
        { label: "M", value: 20 },
        { label: "L", value: 24 },
        { label: "XL", value: 32 },
      ]
  }
}
