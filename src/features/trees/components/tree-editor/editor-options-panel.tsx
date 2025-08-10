import { MenuIcon } from "@/components/icons";
import { ModeToggleGroup } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTreeEditorStore } from "@/store/tree-editor-store";
import { Panel } from "@xyflow/react";
import { useCallback } from "react";
import { useImportFromMindmup } from "../../hooks/tree-editor/use-import-from-mindmup";
import ExportTreeButton from "./export-tree-button";

export default function TreeOptionsPanel() {
    const { inputRef, handleFileUpload, openFilePicker } =
        useImportFromMindmup();

    return (
        <Panel position="top-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="secondary">
                        <MenuIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[230px]">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={openFilePicker}>
                            استيراد من Mindmup
                        </DropdownMenuItem>

                        <ExportTreeButton>
                            <DropdownMenuItem
                                className="flex items-center justify-between"
                                onSelect={(e) => e.preventDefault()}
                            >
                                تصدير كصورة
                            </DropdownMenuItem>
                        </ExportTreeButton>
                        <ToggleMiniMap />
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="flex justify-between">
                        <DropdownMenuLabel>المظهر</DropdownMenuLabel>
                        <ModeToggleGroup />
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <input
                ref={inputRef}
                type="file"
                accept=".json,.mup"
                onChange={handleFileUpload}
                style={{ display: "none" }}
            />
        </Panel>
    );
}

function ToggleMiniMap() {
    const miniMap = useTreeEditorStore((state) => state.miniMap);
    const setMinimap = useTreeEditorStore((state) => state.setMiniMap);
    const handleMinimapToggle = useCallback(() => {
        setMinimap((prev) => !prev);
    }, [setMinimap]);

    return (
        <DropdownMenuItem
            className="flex items-center justify-between"
            onClick={handleMinimapToggle}
        >
            {miniMap ? "أخفاء الخريطة المصغرة" : "عرض الخريط المصغرة"}
        </DropdownMenuItem>
    );
}
