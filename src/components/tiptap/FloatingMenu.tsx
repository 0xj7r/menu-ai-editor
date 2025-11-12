import { Editor } from "@tiptap/react";
import {
    BoldIcon,
    CheckCheckIcon,
    // Heading1Icon,
    // Heading2,
    // Heading3,
    ItalicIcon,
    LetterTextIcon,
    // ListIcon,
    // ListOrderedIcon,
    Minimize2Icon,
    SparklesIcon,
    StrikethroughIcon,
    UnderlineIcon,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleOpenAIStream } from "@/utils/openai";

type FloatingMenuProps = {
    editor: Editor;
};

function DefaultMenu({ editor }: FloatingMenuProps) {
    return (
        <>
            {/* <Button
        variant="ghost"
        size="icon"
        className="h-full w-10"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Heading1Icon className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-full w-10"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Heading2 className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-full w-10"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Heading3 className="h-3 w-3" />
      </Button>

      <div className="h-4 w-px bg-muted-foreground" aria-hidden="true" /> */}

            <Button
                variant="ghost"
                size="icon"
                className="h-full w-10"
                onClick={() => editor.chain().focus().toggleBold().run()}
                onMouseDown={(e) => e.preventDefault()}
            >
                <BoldIcon className="h-3 w-3" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-full w-10"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                onMouseDown={(e) => e.preventDefault()}
            >
                <ItalicIcon className="h-3 w-3" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-full w-10"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                onMouseDown={(e) => e.preventDefault()}
            >
                <UnderlineIcon className="h-3 w-3" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-full w-10"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                onMouseDown={(e) => e.preventDefault()}
            >
                <StrikethroughIcon className="h-3 w-3" />
            </Button>

            {/* <div className="h-4 w-px bg-muted-foreground" aria-hidden="true" /> */}

            {/* <Button
                variant="ghost"
                size="icon"
                className="h-full w-10"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                onMouseDown={(e) => e.preventDefault()}
            >
                <ListIcon className="h-3 w-3" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-full w-10"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                onMouseDown={(e) => e.preventDefault()}
            >
                <ListOrderedIcon className="h-3 w-3" />
            </Button> */}
        </>
    );
}

function formatEditorContent(content: string): string {
    return content.replace(/\n/g, "<br />");
}

type MagicMenuProps = {
    handleMagicCommand: (intent: string) => void;
    onAskAI: () => void;
};

function MagicMenu({ handleMagicCommand, onAskAI }: MagicMenuProps) {
    return (
        <>
            <Button
                variant="ghost"
                type="button"
                size="icon"
                className="flex h-full w-24 items-center"
                onClick={onAskAI}
                onMouseDown={(e) => e.preventDefault()}
            >
                <SparklesIcon className="h-3 w-3" />
                <span className="text-sm">Ask AI</span>
            </Button>
            <Button
                variant="ghost"
                type="button"
                size="icon"
                className="flex h-full w-24 items-center"
                onClick={() => handleMagicCommand("grammar")}
                onMouseDown={(e) => e.preventDefault()}
            >
                <CheckCheckIcon className="h-3 w-3" />
                <span className="text-sm">Grammar</span>
            </Button>
            <Button
                variant="ghost"
                type="button"
                size="icon"
                className="flex h-full w-24 items-center"
                onClick={() => handleMagicCommand("shorten")}
                onMouseDown={(e) => e.preventDefault()}
            >
                <Minimize2Icon className="h-3 w-3" />
                <span className="text-sm">Shorten</span>
            </Button>
        </>
    );
}

export function FloatingMenu({ editor }: FloatingMenuProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showAIInput, setShowAIInput] = useState(false);
    const [askAIPrompt, setAskAIPrompt] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [previewText, setPreviewText] = useState("");
    const [originalText, setOriginalText] = useState("");
    const [streamDone, setStreamDone] = useState(false);

    const handleMagicCommand = async (intent: string, userPrompt?: string) => {
        const selectedText = editor?.state.doc.textBetween(
            editor?.state.selection?.from,
            editor?.state.selection?.to,
            ""
        );

        if (!selectedText) {
            return;
        }

        // Prepare streaming preview
        setOriginalText(selectedText);
        setPreviewText("");
        setIsStreaming(true);
        setStreamDone(false);
        const onData = (chunk: string) => {
            setPreviewText((prev) => prev + chunk);
        };
        const onDone = () => {
            setIsStreaming(false);
            setStreamDone(true);
        };

        handleOpenAIStream(intent, selectedText, onData, userPrompt, onDone);
    };

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
        setShowAIInput(false);
        setAskAIPrompt("");
        setPreviewText("");
        setOriginalText("");
        setIsStreaming(false);
        setStreamDone(false);
    };

    const handleAskAI = () => {
        setShowAIInput(true);
    };

    const handleAIPromptSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (askAIPrompt.trim() !== "") {
            handleMagicCommand("rewrite", askAIPrompt);
        }
        setAskAIPrompt("");
        setShowAIInput(false);
    };

    function renderLoader() {
        return (
            <div className="flex items-center gap-2 px-2">
                <div className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:0ms]" />
                    <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:150ms]" />
                    <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-purple-500 [animation-delay:300ms]" />
                </div>
                <span className="text-xs text-muted-foreground">
                    Reading and drafting…
                </span>
            </div>
        );
    }

    // Simple word-level diff to show additions (green) and deletions (red strikethrough)
    function diffWords(a: string, b: string) {
        const aWords = a.split(/\s+/);
        const bWords = b.split(/\s+/);
        const m = aWords.length;
        const n = bWords.length;
        const dp: number[][] = Array.from({ length: m + 1 }, () =>
            Array.from({ length: n + 1 }, () => 0)
        );
        for (let i = m - 1; i >= 0; i--) {
            for (let j = n - 1; j >= 0; j--) {
                if (aWords[i] === bWords[j]) dp[i][j] = dp[i + 1][j + 1] + 1;
                else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
            }
        }
        const parts: Array<{ type: "equal" | "remove" | "add"; text: string }> =
            [];
        let i = 0,
            j = 0;
        while (i < m && j < n) {
            if (aWords[i] === bWords[j]) {
                parts.push({ type: "equal", text: aWords[i] });
                i++;
                j++;
            } else if (dp[i + 1][j] >= dp[i][j + 1]) {
                parts.push({ type: "remove", text: aWords[i] });
                i++;
            } else {
                parts.push({ type: "add", text: bWords[j] });
                j++;
            }
        }
        while (i < m) {
            parts.push({ type: "remove", text: aWords[i++] });
        }
        while (j < n) {
            parts.push({ type: "add", text: bWords[j++] });
        }
        return parts;
    }

    function renderDiffPreview() {
        const parts = diffWords(originalText, previewText);
        return (
            <div className="max-w-[420px] rounded border border-muted-foreground/20 bg-background px-2 py-1 text-sm">
                <div className="mb-2 max-h-40 overflow-auto">
                    {parts.map((p, idx) => {
                        if (p.type === "equal") {
                            return (
                                <span key={idx} className="text-foreground">
                                    {p.text}{" "}
                                </span>
                            );
                        }
                        if (p.type === "remove") {
                            return (
                                <span
                                    key={idx}
                                    className="bg-gray-200 line-through text-gray-600"
                                >
                                    {p.text + " "}
                                </span>
                            );
                        }
                        return (
                            <span
                                key={idx}
                                className="bg-green-100/80 text-green-800 rounded"
                            >
                                {p.text + " "}
                            </span>
                        );
                    })}
                </div>
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                            // discard
                            setPreviewText("");
                            setOriginalText("");
                            setIsStreaming(false);
                            setStreamDone(false);
                        }}
                    >
                        Reject
                    </Button>
                    <Button
                        size="sm"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                            const html = formatEditorContent(
                                previewText.trim()
                            );
                            editor
                                ?.chain()
                                .focus()
                                .deleteSelection()
                                .insertContent(html)
                                .run();
                            setPreviewText("");
                            setOriginalText("");
                            setIsStreaming(false);
                            setStreamDone(false);
                        }}
                        data-commit-change="true"
                    >
                        Accept
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-10 min-w-fit" data-richtext-bubble>
            <div className="z-1 flex h-full items-center justify-start gap-1 rounded-md bg-muted p-1">
                <Button
                    type="button"
                    size="icon"
                    className="h-full w-10 flex-shrink-0"
                    variant="ghost"
                    onClick={toggleMenu}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    {isExpanded ? (
                        <SparklesIcon className="h-3 w-3" />
                    ) : (
                        <LetterTextIcon className="h-3 w-3" />
                    )}
                </Button>

                <div
                    className="h-4 w-px flex-shrink-0 bg-muted-foreground"
                    aria-hidden="true"
                />

                {showAIInput ? (
                    <form
                        onSubmit={handleAIPromptSubmit}
                        className="flex h-full flex-1 items-center"
                    >
                        <div className="flex h-full w-full items-center">
                            <Input
                                type="text"
                                placeholder="Enter your prompt..."
                                value={askAIPrompt}
                                onChange={(e) => setAskAIPrompt(e.target.value)}
                                className="h-full w-64 text-sm"
                            />
                            <Button
                                type="submit"
                                variant="ghost"
                                size="icon"
                                className="ml-1 h-full w-10 flex-shrink-0"
                                onClick={handleAIPromptSubmit}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <SparklesIcon className="h-3 w-3" />
                            </Button>
                        </div>
                    </form>
                ) : isStreaming ? (
                    renderLoader()
                ) : previewText && streamDone ? (
                    renderDiffPreview()
                ) : (
                    <div className="flex h-full flex-1 items-center gap-0.5">
                        {isExpanded ? (
                            <DefaultMenu editor={editor} />
                        ) : (
                            <MagicMenu
                                handleMagicCommand={handleMagicCommand}
                                onAskAI={handleAskAI}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
