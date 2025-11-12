"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { EditorContent, BubbleMenu, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";
import { FloatingMenu } from "@/components/tiptap/FloatingMenu";

interface EditableRichTextProps {
    value: string;
    onChange: (value: string) => void;
    style?: React.CSSProperties;
    multiline?: boolean;
    placeholder?: string;
}

export const EditableRichText: React.FC<EditableRichTextProps> = ({
    value,
    onChange,
    style,
    multiline = false,
    placeholder = "Click to edit",
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const initialContent = useMemo(() => {
        if (multiline) {
            const lines = (value || "")
                .split("\n")
                .map((l) => `<p>${l || ""}</p>`)
                .join("");
            return lines || "<p></p>";
        }
        return `<p>${value || ""}</p>`;
    }, [value, multiline]);

    const editor = useEditor({
        editable: isEditing,
        extensions: [
            StarterKit.configure({
                codeBlock: false,
            }),
            Placeholder.configure({
                placeholder,
            }),
            Underline,
        ],
        content: initialContent,
        onBlur({ event }: any) {
            // propagate plain text to consumers to keep data simple
            const target = (event?.relatedTarget as HTMLElement | null) ?? null;
            // If blur is caused by interacting with the bubble menu, keep editing active
            // unless the target explicitly commits the change.
            const isBubble = Boolean(target && target.closest("[data-richtext-bubble]"));
            const isCommit = Boolean(target && target.closest("[data-commit-change='true']"));
            if (isBubble && !isCommit) {
                return;
            }
            const next = editor?.getText() ?? "";
            onChange(next);
            setIsEditing(false);
        },
    });

    // keep content in sync when external value changes and not currently editing
    useEffect(() => {
        if (!isEditing && editor && editor.getText() !== value) {
            editor.commands.setContent(initialContent, false);
        }
    }, [value, isEditing, editor, initialContent]);

    const handleDoubleClick = () => {
        setIsEditing(true);
        editor?.setEditable(true);
        // focus at end
        editor?.chain().focus("end").run();
    };

    const handleKeyDown: React.KeyboardEventHandler = (e) => {
        if (!multiline && e.key === "Enter") {
            editor?.commands.blur();
        }
        if (e.key === "Escape") {
            // revert to previous value and exit
            editor?.commands.setContent(initialContent, false);
            setIsEditing(false);
            editor?.commands.blur();
        }
    };

    return isEditing && editor ? (
        <div style={style} className="relative inline-block min-w-[20px]">
            <EditorContent
                editor={editor}
                onKeyDown={handleKeyDown}
                className="outline-none"
            />
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100, interactive: true, hideOnClick: false }}>
                <FloatingMenu editor={editor} />
            </BubbleMenu>
        </div>
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
    );
};
