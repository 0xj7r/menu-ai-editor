"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText } from "lucide-react"
import { PdfExportButton } from "./pdf-export-button"

interface ExportDialogProps {
  children?: React.ReactNode
}

export function ExportDialog({ children }: ExportDialogProps) {
  const [filename, setFilename] = useState("menu")
  const [isOpen, setIsOpen] = useState(false)

  const handleExportComplete = (success: boolean) => {
    if (success) {
      setIsOpen(false)
      alert("PDF exported successfully!")
    } else {
      alert("PDF export failed. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Menu as PDF</DialogTitle>
          <DialogDescription>
            Export your menu as a high-quality PDF file. The PDF will match your current preview exactly.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="filename" className="text-right">
              Filename
            </Label>
            <Input
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="col-span-3"
              placeholder="Enter filename"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <PdfExportButton filename={filename} onExportComplete={handleExportComplete} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
