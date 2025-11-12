"use client"

import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"
import { usePdfExport } from "@/hooks/use-pdf-export"

interface PdfExportButtonProps {
  filename?: string
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
  onExportStart?: () => void
  onExportComplete?: (success: boolean) => void
}

export function PdfExportButton({
  filename = "menu",
  variant = "default",
  size = "default",
  className,
  onExportStart,
  onExportComplete,
}: PdfExportButtonProps) {
  const { exportToPdf, isExporting, error } = usePdfExport()

  const handleExport = async () => {
    try {
      onExportStart?.()
      await exportToPdf(filename)
      onExportComplete?.(true)
    } catch (err) {
      console.error("Export failed:", err)
      onExportComplete?.(false)
    }
  }

  return (
    <Button onClick={handleExport} disabled={isExporting} variant={variant} size={size} className={className}>
      {isExporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </>
      )}
    </Button>
  )
}
