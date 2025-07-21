import ToolTipButton from "@/components/tooltip-button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTreeEditorStore } from "@/store/tree-editor-store";
import { Panel, useReactFlow, useViewport } from "@xyflow/react";
import { Minus, Plus, Redo2, Undo2 } from "lucide-react";
import { useCallback, useEffect } from "react";

export default function ZoomAndHistoryPanel() {
    return (
        <Panel position="bottom-right" className="flex gap-2">
            <TooltipProvider>
                <HistoryButtons />
                <ZoomControll />
            </TooltipProvider>
        </Panel>
    );
}

function HistoryButtons() {
    const { undo, redo, pastStates, futureStates } =
        useTreeEditorStore.temporal.getState();
    const isEditorFocus = useTreeEditorStore((state) => state.isEditorFocus);

    const handleUndo = useCallback(() => {
        const canUndo = pastStates.length > 1;
        if (canUndo) {
            undo();
        }
    }, [undo, pastStates]);

    const handleRedo = useCallback(() => {
        redo();
    }, [redo]);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (!isEditorFocus) {
                return;
            }

            const isModifierKey = e.metaKey || e.ctrlKey;

            if (isModifierKey && e.key === "z" && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                e.stopPropagation();
                handleUndo();
            }

            if (isModifierKey && e.key === "y" && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                e.stopPropagation();
                handleRedo();
            }
        };

        document.addEventListener("keydown", handleKeydown);

        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [isEditorFocus, handleUndo, handleRedo]);

    return (
        <div className="flex gap-2 rounded-xl bg-secondary p-1">
            <ToolTipButton
                onClick={handleUndo}
                size="icon"
                variant={"ghost"}
                disabled={pastStates.length === 1}
                className="hover:bg-background/70"
                tooltip="تراجع"
            >
                <Undo2 />
            </ToolTipButton>
            <ToolTipButton
                onClick={handleRedo}
                size="icon"
                variant={"ghost"}
                disabled={futureStates.length === 0}
                className="hover:bg-background/70"
                tooltip="أعادة تنفيذ"
            >
                <Redo2 />
            </ToolTipButton>
        </div>
    );
}

function ZoomControll() {
    const { zoom } = useViewport();
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!e.ctrlKey && !e.metaKey) return;

            const isZoomIn = ["=", "+"].includes(e.key);
            const isZoomOut = e.key === "-";
            const fitToView = e.key === "0";

            if (isZoomIn) {
                e.preventDefault();
                return zoomIn();
            }

            if (isZoomOut) {
                e.preventDefault();
                return zoomOut();
            }

            if (fitToView) {
                e.preventDefault();
                return fitView({ duration: 300 });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [zoomIn, zoomOut, fitView]);

    return (
        <div className="flex rounded-xl bg-secondary p-1">
            <ToolTipButton
                variant="ghost"
                size="icon"
                onClick={() => zoomOut()}
                className="hover:bg-background/70"
                tooltip="(Ctrl + -) تصغير"
            >
                <Minus />
            </ToolTipButton>
            <ToolTipButton
                variant="ghost"
                size="icon"
                onClick={() => fitView({ duration: 300 })}
                className="w-14 hover:bg-background/70"
                tooltip="(Ctrl + 0) اعادة تعين الشاشة"
            >
                {(100 * zoom).toFixed(0)}%{" "}
            </ToolTipButton>
            <ToolTipButton
                variant="ghost"
                size="icon"
                onClick={() => zoomIn()}
                className="hover:bg-background/70"
                tooltip="(Ctrl + +) تكبير"
            >
                <Plus />
            </ToolTipButton>
        </div>
    );
}
