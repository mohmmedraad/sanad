"use client";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useTreeEditorStore } from "@/store/tree-editor-store";

interface LayoutViewerProps {
    editor: React.ReactNode;
    draft: React.ReactNode;
    direction?: React.ComponentProps<typeof ResizablePanelGroup>["direction"];
}
export function LayoutViewer({
    editor,
    draft,
    direction = "horizontal",
}: LayoutViewerProps) {
    const layout = useTreeEditorStore((state) => state.layout);

    return (
        <ResizablePanelGroup direction={direction} autoSaveId="editor">
            {layout === "tree-editor" && (
                <ResizablePanel id="tree-editor">{editor}</ResizablePanel>
            )}

            {layout === "draft" && (
                <ResizablePanel id="draft">{draft}</ResizablePanel>
            )}
            {layout === "both" && (
                <>
                    <ResizablePanel className="min-w-[50vw]">
                        <div onDragOver={(e) => e.stopPropagation()}>
                            {editor}
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel className="min-w-[400px]">
                        {draft}
                    </ResizablePanel>
                </>
            )}
        </ResizablePanelGroup>
    );
}
