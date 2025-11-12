import { useCallback, useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoUploaderProps {
    value?: string;
    onChange: (dataUrl: string) => void;
    size: number;
}

export function LogoUploader({ value, onChange, size }: LogoUploaderProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = useCallback(
        (files: FileList | null) => {
            const file = files && files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = String(reader.result || "");
                onChange(dataUrl);
            };
            reader.readAsDataURL(file);
        },
        [onChange]
    );

    const openPicker = () => inputRef.current?.click();

    // Display uploaded logo
    if (value) {
        return (
            <div className="inline-flex flex-col items-center">
                <div
                    className="relative rounded-md overflow-hidden cursor-pointer"
                    style={{ width: size, height: size }}
                    title="Click to change logo"
                    onClick={() => inputRef.current?.click()}
                >
                    <img
                        src={value}
                        alt="Logo"
                        style={{
                            width: size,
                            height: size,
                            objectFit: "contain",
                        }}
                    />
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                </div>
                <div
                    className="mt-2 flex items-center gap-2"
                    style={{ width: size, justifyContent: "center" }}
                >
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            inputRef.current?.click();
                        }}
                        title="Replace logo"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange("");
                        }}
                        title="Remove logo"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    }

    // Upload dropzone – styled similar to Tiptap Image Upload Node using shadcn primitives
    return (
        <div
            onClick={openPicker}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                setIsDragging(false);
            }}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
            }}
            className={[
                "group relative flex cursor-pointer flex-col items-center justify-center rounded-lg",
                "border border-dashed bg-background",
                isDragging
                    ? "border-primary/60 bg-primary/5"
                    : "border-muted-foreground/40",
                "transition-colors",
            ].join(" ")}
            style={{
                width: Math.max(size * 3.6, 480), // large, like the demo
                height: Math.max(size * 1.8, 160),
            }}
            title="Click to upload or drag and drop"
        >
            {/* Document with badge */}
            <div className="relative mb-3">
                <div className="h-10 w-8 rounded bg-muted" />
                <div className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                    <UploadCloud className="h-3.5 w-3.5" />
                </div>
            </div>
            <div className="text-sm">
                <span className="underline underline-offset-2 text-foreground">
                    Click to upload
                </span>{" "}
                <span className="text-muted-foreground">or drag and drop</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
                Maximum 1 file, 10MB.
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
            />
        </div>
    );
}
