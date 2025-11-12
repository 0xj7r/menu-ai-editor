import type { MenuCategory } from "@/types/menu"

export const getColumnizedCategories = (categories: MenuCategory[], columns: number) => {
  if (columns === 1) {
    return [categories]
  }

  const midPoint = Math.ceil(categories.length / 2)
  return [categories.slice(0, midPoint), categories.slice(midPoint)]
}

export const getFoodCategories = (categories: MenuCategory[]) => {
  return categories.filter((category) => category.type === "food")
}

export const getDrinkCategories = (categories: MenuCategory[]) => {
  return categories.filter((category) => category.type === "drink")
}
