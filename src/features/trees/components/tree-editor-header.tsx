"use client";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import { ChevronLeftIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTreeEditorStore } from "@/store/tree-editor-store";
import { useEffect, useRef, useState } from "react";

export default function TreeEditorHeader() {
    return (
        <>
            <header className="h-[var(--header-hight)] border-[#d6d8da] border-b-2 border-dotted dark:border-gray-700">
                <div className="flex h-full items-center justify-between px-2 md:px-10">
                    <div className="flex flex-1 items-center gap-2">
                        <CustomBreadcrumb
                            links={[
                                {
                                    name: "المشجرات",
                                    href: "/profile/trees",
                                },
                            ]}
                            className="hidden md:block"
                            isLastLinkClickable
                        />
                        <ChevronLeftIcon className="hidden size-3.5 md:block" />
                        <EditableTitle />
                    </div>
                    <div className="md:flex-1">
                        <LayoutToggle />
                    </div>
                    <div className="hidden md:block" />
                </div>
            </header>
        </>
    );
}

function EditableTitle() {
    const title = useTreeEditorStore((state) => state.title);
    const setTitle = useTreeEditorStore((state) => state.setTitle);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(title);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setEditValue(title);
    }, [title]);

    const handleSubmit = () => {
        const newTitle = editValue.trim();
        if (newTitle && newTitle !== title) {
            setTitle(newTitle);
            document.title = `المشجرات - ${newTitle}`;
        }
        setEditValue(newTitle);
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

    if (isEditing) {
        return (
            <Input
                ref={inputRef}
                style={{
                    width: "150px",
                    boxSizing: "initial",
                }}
                value={editValue}
                onBlur={handleSubmit}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="md-text-xl! rounded border-none bg-transparent ps-2 text-foreground text-sm shadow-none transition-colors hover:bg-gray-100 focus-visible:border-none focus-visible:ring-0 dark:hover:bg-gray-900"
                autoFocus
            />
        );
    }

    return (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <h2
            title="انقر للتعديل"
            onClick={() => setIsEditing(true)}
            className="md-text-xl w-max cursor-pointer rounded px-2 py-1 text-foreground text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-900"
        >
            {title}
        </h2>
    );
}

function LayoutToggle() {
    const isMobile = useIsMobile();
    const layout = useTreeEditorStore((state) => state.layout);
    const setLayout = useTreeEditorStore((state) => state.setLayout);

    return (
        <ToggleGroup
            type="single"
            size={isMobile ? "sm" : "lg"}
            variant="outline"
            value={layout}
            onValueChange={(value) => {
                // @ts-ignore
                if (value) setLayout(value);
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
