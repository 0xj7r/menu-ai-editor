"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface EditableTextProps {
  value: string
  onChange: (value: string) => void
  style?: React.CSSProperties
  multiline?: boolean
  placeholder?: string
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  style,
  multiline = false,
  placeholder = "Click to edit",
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(value)

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onChange(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      handleBlur()
    }
    if (e.key === "Escape") {
      setText(value)
      setIsEditing(false)
    }
  }

  const inputStyle = {
    ...style,
    backgroundColor: "transparent",
    border: "2px solid #3b82f6",
    borderRadius: "4px",
    padding: "2px 4px",
    outline: "none",
    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
  }

  return isEditing ? (
    multiline ? (
      <Textarea
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        placeholder={placeholder}
        style={inputStyle}
        className="resize-none min-h-[auto] z-50 relative"
        rows={Math.max(1, text.split("\n").length)}
      />
    ) : (
      <Input
        type="text"
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        placeholder={placeholder}
        style={inputStyle}
        className="shadow-none focus-visible:ring-0 p-1 z-50 relative"
      />
    )
  ) : (
    <span
      onDoubleClick={handleDoubleClick}
      style={style}
      className="cursor-pointer hover:bg-blue-50 hover:outline hover:outline-2 hover:outline-blue-300 hover:outline-dashed rounded px-1 transition-all duration-200 relative group inline-block min-w-[20px] min-h-[1em] z-40"
      title="Double-click to edit"
    >
      {value || placeholder}
      <span className="absolute -top-8 left-0 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
        Double-click to edit
      </span>
    </span>
  )
}
