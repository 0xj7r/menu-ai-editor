"use client"

import { Plus, Minus } from "lucide-react"
import { useState } from "react"

interface PageBreakIndicatorProps {
  onAddPageBreak: () => void
  onRemovePageBreak?: () => void
  hasPageBreak?: boolean
  position: "before" | "after"
  elementType: "category" | "section" | "item"
}

export const PageBreakIndicator = ({
  onAddPageBreak,
  onRemovePageBreak,
  hasPageBreak = false,
  position,
  elementType,
}: PageBreakIndicatorProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (hasPageBreak && onRemovePageBreak) {
      onRemovePageBreak()
    } else {
      onAddPageBreak()
    }
  }

  return (
    <div className="relative w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Page Break Line (visible when page break exists) */}
      {hasPageBreak && (
        <div className="relative my-8 w-full">
          <div className="border-t-2 border-dashed border-blue-500 relative w-full">
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 text-xs rounded font-medium whitespace-nowrap z-10">
              PAGE BREAK
            </div>
          </div>
        </div>
      )}

      {/* Hover Indicators - Only at the very edges, no overlay zones */}
      <div
        className={`absolute ${position === "before" ? "-top-4" : "-bottom-4"} left-0 right-0 flex justify-between items-center transition-opacity duration-200 z-30 pointer-events-none`}
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        {/* Left Button - At very edge with its own hover zone */}
        <div
          className="absolute -left-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow-lg transition-all duration-200 hover:scale-110 pointer-events-auto flex items-center justify-center"
            onClick={handleClick}
            title={
              hasPageBreak
                ? `Remove page break ${position} ${elementType}`
                : `Add page break ${position} ${elementType}`
            }
            style={{ minWidth: "24px", minHeight: "24px" }}
          >
            {hasPageBreak ? <Minus size={10} /> : <Plus size={10} />}
          </button>
        </div>

        {/* Right Button - At very edge with its own hover zone */}
        <div
          className="absolute -right-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow-lg transition-all duration-200 hover:scale-110 pointer-events-auto flex items-center justify-center"
            onClick={handleClick}
            title={
              hasPageBreak
                ? `Remove page break ${position} ${elementType}`
                : `Add page break ${position} ${elementType}`
            }
            style={{ minWidth: "24px", minHeight: "24px" }}
          >
            {hasPageBreak ? <Minus size={10} /> : <Plus size={10} />}
          </button>
        </div>
      </div>

      {/* Small hover zones only at the edges - don't cover content */}
      <div
        className={`absolute ${position === "before" ? "-top-6" : "-bottom-6"} -left-16 w-8 h-12 bg-transparent z-20`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <div
        className={`absolute ${position === "before" ? "-top-6" : "-bottom-6"} -right-16 w-8 h-12 bg-transparent z-20`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  )
}
