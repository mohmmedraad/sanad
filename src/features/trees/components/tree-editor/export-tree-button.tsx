"use client";
import {
    CheckIcon,
    CopyIcon,
    DownloadIcon,
    LoaderCircleIcon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { downloadImage } from "@/lib/utils";
import {
    getNodesBounds,
    getViewportForBounds,
    useReactFlow,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";

type ExportTreeButtonProps = {
    children: React.ReactNode;
};

const DEFAULT_WIDTH = 1024;
const DEFAULT_HEIGHT = 768;

export default function ExportTreeButton({ children }: ExportTreeButtonProps) {
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
                        <DownloadIcon />
                        تنزيل كـ PNG
                    </Button>
                    <Button
                        variant={"secondary"}
                        onClick={onCopyToClipboard}
                        disabled={status === "clipboard-saving"}
                        className="w-full sm:w-[initial]"
                    >
                        {status === "clipboard-saving" ? (
                            <CheckIcon className="text-green-500" />
                        ) : (
                            <CopyIcon />
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
                            width={16}
                            height={16}
                            role="status"
                            aria-label="جار التحميل..."
                        />
                    </div>
                )}
            </div>
        </>
    );
}
