"use client";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTreeEditorStore } from "@/store/tree-editor-store";
import type { Layout } from "@/types";
import { useEffect, useRef, useState } from "react";

export default function TreeEditorHeader() {
    const title = useTreeEditorStore((state) => state.title);
    const layout = useTreeEditorStore((state) => state.layout);
    const setLayout = useTreeEditorStore((state) => state.setLayout);
    const setTitle = useTreeEditorStore((state) => state.setTitle);

    useEffect(() => {
        if (!document) {
            return;
        }

        document.title = `المشجرات - ${title}`;
    }, [title]);

    return (
        <>
            <header className="h-[var(--header-hight)] border-[#d6d8da] border-b-2 border-dotted dark:border-gray-700">
                <div className="flex h-full items-center justify-between px-2 md:px-10">
                    <div className="flex-1">
                        <EditableTitle title={title} onTitleChange={setTitle} />
                    </div>
                    <div className="md:flex-1">
                        <LayoutToggle
                            value={layout}
                            onValueChange={setLayout}
                        />
                    </div>

                    <div className="hidden md:block" />
                </div>
            </header>
        </>
    );
}

interface EditableTitleProps {
    title: string;
    onTitleChange: (title: string) => void;
}

function EditableTitle({ title, onTitleChange }: EditableTitleProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(title);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    useEffect(() => {
        setEditValue(title);
    }, [title]);

    const handleSubmit = () => {
        if (editValue.trim() && editValue !== title) {
            onTitleChange(editValue.trim());
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit();
        } else if (e.key === "Escape") {
            setEditValue(title);
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        handleSubmit();
    };

    if (isEditing) {
        return (
            <Input
                ref={inputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className="md-text-xl! rounded border-none bg-transparent ps-2 text-foreground text-sm shadow-none transition-colors hover:bg-gray-100 focus-visible:border-none focus-visible:ring-0 dark:hover:bg-gray-900"
                style={{
                    width: "150px",
                    boxSizing: "initial",
                }}
            />
        );
    }

    return (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <h2
            className="md-text-xl w-max cursor-pointer rounded px-2 py-1 text-foreground text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-900"
            onClick={() => setIsEditing(true)}
            title="انقر للتعديل"
        >
            {title}
        </h2>
    );
}

interface LayoutToggleProps {
    value: Layout;
    onValueChange: (value: Layout) => void;
}

function LayoutToggle({ value, onValueChange }: LayoutToggleProps) {
    const isMobile = useIsMobile();
    return (
        <ToggleGroup
            type="single"
            size={isMobile ? "sm" : "lg"}
            variant="outline"
            value={value}
            onValueChange={(value) => {
                // @ts-ignore
                if (value) onValueChange(value);
            }}
            className="w-max"
        >
            <ToggleGroupItem value="tree-editor">المحرر</ToggleGroupItem>
            <ToggleGroupItem value="both" className="hidden md:block">
                كليهما
            </ToggleGroupItem>
            <ToggleGroupItem value="draft">المسودة</ToggleGroupItem>
        </ToggleGroup>
    );
}
