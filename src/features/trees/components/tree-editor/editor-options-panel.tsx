import { ModeToggleGroup } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { downloadImage } from "@/lib/utils";
import { useTreeEditorStore } from "@/store/tree-editor-store";
import {
    Panel,
    getNodesBounds,
    getViewportForBounds,
    useReactFlow,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import {
    Check,
    Copy,
    Download,
    LoaderCircleIcon,
    MenuIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { convertMindMupToReactFlow } from "../../lib/utils";
import { findPositionNodes } from "../../lib/utils";
import { mindMapFileSchema } from "../../schema/tree-editor";

export default function TreeOptionsPanel() {
    const nodes = useTreeEditorStore((state) => state.nodes);
    const setNodes = useTreeEditorStore((state) => state.setNodes);
    const setEdges = useTreeEditorStore((state) => state.setEdges);
    const miniMap = useTreeEditorStore((state) => state.miniMap);
    const setMinimap = useTreeEditorStore((state) => state.setMiniMap);
    const inputRef = useRef<HTMLInputElement>(null);
    const { fitView, setCenter } = useReactFlow();

    const handleFileUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            console.log(file);

            if (!file) return;

            if (file.type !== "text/x-mup") {
                return toast.error("الملف غير مدعم");
            }

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const jsonData = JSON.parse(e.target?.result as string);
                    const { data, success, error } =
                        mindMapFileSchema.safeParse(jsonData);

                    if (!success) {
                        return toast.error("الملف غير صالح");
                    }

                    const start = findPositionNodes(nodes);

                    const { nodes: newNodes, edges: newEdges } =
                        await convertMindMupToReactFlow(data, {
                            layout: {
                                rootX: (start?.maxXNode?.position.x || 0) + 200,
                                rootY: start?.minYNode?.position.y,
                            },
                        });

                    setNodes((nodes) => {
                        nodes.push(...newNodes);
                    });
                    setEdges((edges) => {
                        edges.push(...newEdges);
                    });

                    setTimeout(() => {
                        const firstNode = newNodes.at(0);
                        if (firstNode) {
                            setCenter(
                                firstNode.position.x +
                                    (firstNode.width || 190) / 2,
                                firstNode.position.y +
                                    (firstNode.height || 50) / 2,
                                {
                                    duration: 200,
                                    zoom: 1.2,
                                },
                            );
                        }
                    }, 0);
                } catch (error) {
                    toast.error("الملف غير صالح");
                    console.error("Import error:", error);
                }
            };
            reader.readAsText(file);

            event.target.value = "";
        },
        [nodes, setNodes, setEdges, setCenter],
    );

    const openFilePicker = useCallback(() => {
        inputRef.current?.click();
    }, []);

    // Optimize minimap toggle with useCallback
    const handleMinimapToggle = useCallback(() => {
        setMinimap((prev) => {
            console.log("minimap: ", prev);
            return !prev;
        });
    }, [setMinimap]);

    // Memoize minimap text to prevent unnecessary re-renders
    const minimapText = useMemo(() => {
        return miniMap ? "أخفاء الخريطة المصغرة" : "عرض الخريط المصغرة";
    }, [miniMap]);

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
                            استيراد من MinpMup
                        </DropdownMenuItem>

                        <ExportTreeButton>
                            <DropdownMenuItem
                                className="flex items-center justify-between"
                                onSelect={(e) => e.preventDefault()}
                            >
                                تصدير كصورة
                            </DropdownMenuItem>
                        </ExportTreeButton>
                        <DropdownMenuItem
                            className="flex items-center justify-between"
                            onClick={handleMinimapToggle}
                        >
                            {minimapText}
                        </DropdownMenuItem>
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

type ExportTreeButtonProps = {
    children: React.ReactNode;
};

const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 768;

function ExportTreeButton({ children }: ExportTreeButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="sm:flex sm:w-[700px] sm:max-w-full"
                dir="rtl"
            >
                {open && <ExportTreeDialogContent />}
            </DialogContent>
        </Dialog>
    );
}

function ExportTreeDialogContent() {
    const { getNodes } = useReactFlow();
    const [dataUrl, setDataUrl] = useState<string>();
    const [status, setStatus] = useState<
        "none" | "clipboard-saving" | "downloading"
    >("none");
    const { theme } = useTheme();
    const [imageOptions, setImageOptions] = useState({
        background: true,
    });

    // Memoize expensive calculations
    const nodesBounds = useMemo(() => getNodesBounds(getNodes()), [getNodes]);

    const viewportCalculations = useMemo(() => {
        const padding = 50;
        const width = Math.max(nodesBounds.width + padding * 2, DEFAULT_WIDTH);
        const height = Math.max(
            nodesBounds.height + padding * 2,
            DEFAULT_HEIGHT,
        );

        const viewport = getViewportForBounds(
            nodesBounds,
            width,
            height,
            0.95,
            2,
            padding,
        );

        return { width, height, viewport, padding };
    }, [nodesBounds]);

    const generatePreviewImage = useCallback(async () => {
        setDataUrl(undefined);

        const { width, height, viewport } = viewportCalculations;
        const isDarkTheme = !!document.querySelector("html.dark");

        try {
            const dataUrl = await toPng(
                document.querySelector(
                    ".react-flow__viewport",
                ) as HTMLDivElement,
                {
                    backgroundColor: imageOptions.background
                        ? isDarkTheme
                            ? "#141414"
                            : "white"
                        : "transparent",
                    width: width,
                    height: height,
                    pixelRatio: 2,
                    style: {
                        width: String(width),
                        height: String(height),
                        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
                    },
                    skipFonts: false,
                    cacheBust: false,
                    includeQueryParams: true,
                    quality: 1.0,
                    fontEmbedCSS: "",
                    filter: (node) => {
                        if (
                            node.tagName === "SCRIPT" ||
                            node.tagName === "STYLE" ||
                            node?.classList?.contains("react-flow__handle")
                        ) {
                            return false;
                        }
                        return true;
                    },
                },
            );

            setDataUrl(dataUrl);
        } catch (error) {
            console.error("Export failed:", error);
        }
    }, [imageOptions, viewportCalculations]);

    useEffect(() => {
        if (!open) return;

        const timeout = setTimeout(() => {
            generatePreviewImage();
        }, 50);

        return () => clearTimeout(timeout);
    }, [generatePreviewImage]);

    const onDownload = useCallback(() => {
        if (!dataUrl) {
            return;
        }
        setStatus("downloading");
        downloadImage(dataUrl);
        setStatus("none");
    }, [dataUrl]);

    const onCopyToClipboard = useCallback(async () => {
        if (!dataUrl) {
            return;
        }

        setStatus("clipboard-saving");
        try {
            const response = await fetch(dataUrl);
            const blob = await response.blob();

            const clipboardItem = new ClipboardItem({ [blob.type]: blob });
            await navigator.clipboard.write([clipboardItem]);
            setTimeout(() => setStatus("none"), 1000);
        } catch (error) {
            console.error("Failed to copy to clipboard:", error);
            setStatus("none");
        }
    }, [dataUrl]);

    const handleBackgroundChange = useCallback((checked: boolean) => {
        setImageOptions((prev) => ({
            ...prev,
            background: checked,
        }));
    }, []);

    return (
        <>
            <div className="grid gap-5">
                <DialogHeader>
                    <DialogTitle>تصدير الشجرة</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="background" className="flex-1">
                            تضمين الخلفية
                        </Label>
                        <Switch
                            id="background"
                            dir="ltr"
                            defaultChecked={imageOptions.background}
                            disabled={status !== "none" || !dataUrl}
                            onCheckedChange={handleBackgroundChange}
                        />
                    </div>
                </div>
                <div className="mt-auto flex flex-col gap-2 sm:flex-row">
                    <Button
                        variant={"secondary"}
                        onClick={onDownload}
                        disabled={status === "downloading"}
                        className="w-full sm:w-[initial]"
                    >
                        <Download />
                        تنزيل كـ PNG
                    </Button>
                    <Button
                        variant={"secondary"}
                        onClick={onCopyToClipboard}
                        disabled={status === "clipboard-saving"}
                        className="w-full sm:w-[initial]"
                    >
                        {status === "clipboard-saving" ? (
                            <Check className="text-green-500" />
                        ) : (
                            <Copy />
                        )}
                        نسخ الى الحافظة
                    </Button>
                </div>
            </div>
            <Separator orientation="vertical" className="hidden sm:block" />
            <Separator orientation="horizontal" className="block sm:hidden" />
            <div className="h-[250px] sm:w-full">
                {dataUrl ? (
                    <img
                        src={dataUrl}
                        aria-label="flow"
                        className="size-full object-contain"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center">
                        <LoaderCircleIcon
                            className="animate-spin"
                            size={16}
                            role="status"
                            aria-label="جار التحميل..."
                        />
                    </div>
                )}
            </div>
        </>
    );
}
