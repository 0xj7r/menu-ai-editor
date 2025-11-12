"use client"

import { useState, useCallback } from "react"
import type { PageBreak } from "@/types/menu"

export const usePageBreaks = (initialPageBreaks: PageBreak[] = []) => {
  const [pageBreaks, setPageBreaks] = useState<PageBreak[]>(initialPageBreaks)

  const addPageBreak = useCallback((elementId: string, position: "before" | "after") => {
    const newPageBreak: PageBreak = {
      id: `${elementId}-${position}-${Date.now()}`,
      type: "page-break",
      position,
    }

    setPageBreaks((prev) => {
      // Check if page break already exists
      const exists = prev.some((pb) => pb.id.startsWith(`${elementId}-${position}`))
      if (exists) return prev

      return [...prev, newPageBreak]
    })

    console.log("Added page break:", newPageBreak.id)
    return newPageBreak.id
  }, [])

  const removePageBreak = useCallback((pageBreakId: string) => {
    setPageBreaks((prev) => {
      const filtered = prev.filter((pb) => pb.id !== pageBreakId)
      console.log("Removed page break:", pageBreakId)
      return filtered
    })
  }, [])

  const hasPageBreak = useCallback(
    (elementId: string, position: "before" | "after") => {
      return pageBreaks.some((pb) => pb.id.startsWith(`${elementId}-${position}`))
    },
    [pageBreaks],
  )

  const getPageBreakId = useCallback(
    (elementId: string, position: "before" | "after") => {
      const pageBreak = pageBreaks.find((pb) => pb.id.startsWith(`${elementId}-${position}`))
      return pageBreak?.id
    },
    [pageBreaks],
  )

  return {
    pageBreaks,
    addPageBreak,
    removePageBreak,
    hasPageBreak,
    getPageBreakId,
  }
}
