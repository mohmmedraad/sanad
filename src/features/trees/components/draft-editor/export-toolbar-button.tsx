"use client";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { withProps } from "@udecode/cn";
import {
    BaseParagraphPlugin,
    SlateLeaf,
    createSlateEditor,
    serializeHtml,
} from "@udecode/plate";
import { BaseAlignPlugin } from "@udecode/plate-alignment";
import {
    BaseBoldPlugin,
    BaseItalicPlugin,
    BaseStrikethroughPlugin,
    BaseSubscriptPlugin,
    BaseSuperscriptPlugin,
    BaseUnderlinePlugin,
} from "@udecode/plate-basic-marks";
import { BaseBlockquotePlugin } from "@udecode/plate-block-quote";
import { BaseDatePlugin } from "@udecode/plate-date";
import {
    BaseFontBackgroundColorPlugin,
    BaseFontColorPlugin,
    BaseFontSizePlugin,
} from "@udecode/plate-font";
import {
    BaseHeadingPlugin,
    BaseTocPlugin,
    HEADING_KEYS,
    HEADING_LEVELS,
} from "@udecode/plate-heading";
import { BaseHighlightPlugin } from "@udecode/plate-highlight";
import { BaseHorizontalRulePlugin } from "@udecode/plate-horizontal-rule";
import { BaseIndentPlugin } from "@udecode/plate-indent";
import { BaseIndentListPlugin } from "@udecode/plate-indent-list";
import { BaseKbdPlugin } from "@udecode/plate-kbd";
import { BaseColumnItemPlugin, BaseColumnPlugin } from "@udecode/plate-layout";
import { BaseLinkPlugin } from "@udecode/plate-link";
import { BaseMentionPlugin } from "@udecode/plate-mention";
import { BaseTogglePlugin } from "@udecode/plate-toggle";
import { useEditorRef } from "@udecode/plate/react";

import {
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { BlockquoteElementStatic } from "./blockquote-element-static";
import { ColumnElementStatic } from "./column-element-static";
import { ColumnGroupElementStatic } from "./column-group-element-static";
import { DateElementStatic } from "./date-element-static";
import { HeadingElementStatic } from "./heading-element-static";
import { HighlightLeafStatic } from "./highlight-leaf-static";
import { HrElementStatic } from "./hr-element-static";
import { FireLiComponent, FireMarker } from "./indent-fire-marker";
import { TodoLiStatic, TodoMarkerStatic } from "./indent-todo-marker-static";
import { LinkElementStatic } from "./link-element-static";
import { MentionElementStatic } from "./mention-element-static";
import { ParagraphElementStatic } from "./paragraph-element-static";
import { TocElementStatic } from "./toc-element-static";
import { ToggleElementStatic } from "./toggle-element-static";

import { env } from "@/env";
import { EditorStatic } from "./editor-static";
import { KbdLeafStatic } from "./kbd-leaf-static";
import { HadithElementStatic, HadithPlugin } from "./plugins/hadith-plugin";

export function ExportToolbarButton(props: DropdownMenuProps) {
    const editor = useEditorRef();

    const getCanvas = async () => {
        const { default: html2canvas } = await import("html2canvas-pro");

        const style = document.createElement("style");
        document.head.append(style);

        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const canvas = await html2canvas(editor.api.toDOMNode(editor)!, {
            onclone: (document: Document) => {
                const editorElement = document.querySelector(
                    '[contenteditable="true"]',
                );
                if (editorElement) {
                    // biome-ignore lint/complexity/noForEach: <explanation>
                    Array.from(editorElement.querySelectorAll("*")).forEach(
                        (element) => {
                            const existingStyle =
                                element.getAttribute("style") || "";
                            element.setAttribute(
                                "style",
                                `${existingStyle}; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important`,
                            );
                        },
                    );
                }
            },
        });
        style.remove();

        return canvas;
    };

    const downloadFile = async (url: string, filename: string) => {
        const response = await fetch(url);

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.append(link);
        link.click();
        link.remove();

        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
    };

    const exportToPdf = async () => {
        const canvas = await getCanvas();

        const PDFLib = await import("pdf-lib");
        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage([canvas.width, canvas.height]);
        const imageEmbed = await pdfDoc.embedPng(canvas.toDataURL("PNG"));
        const { height, width } = imageEmbed.scale(1);
        page.drawImage(imageEmbed, {
            height,
            width,
            x: 0,
            y: 0,
        });
        const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });

        await downloadFile(pdfBase64, "plate.pdf");
    };

    const exportToImage = async () => {
        const canvas = await getCanvas();
        await downloadFile(canvas.toDataURL("image/png"), "plate.png");
    };

    const exportToHtml = async () => {
        const components = {
            [BaseBlockquotePlugin.key]: BlockquoteElementStatic,
            [BaseBoldPlugin.key]: withProps(SlateLeaf, { as: "strong" }),
            [BaseColumnItemPlugin.key]: ColumnElementStatic,
            [BaseColumnPlugin.key]: ColumnGroupElementStatic,
            [BaseDatePlugin.key]: DateElementStatic,
            [BaseHighlightPlugin.key]: HighlightLeafStatic,
            [BaseHorizontalRulePlugin.key]: HrElementStatic,
            [BaseItalicPlugin.key]: withProps(SlateLeaf, { as: "em" }),
            [BaseKbdPlugin.key]: KbdLeafStatic,
            [BaseLinkPlugin.key]: LinkElementStatic,
            [BaseMentionPlugin.key]: MentionElementStatic,
            [BaseParagraphPlugin.key]: ParagraphElementStatic,
            [BaseStrikethroughPlugin.key]: withProps(SlateLeaf, { as: "del" }),
            [BaseSubscriptPlugin.key]: withProps(SlateLeaf, { as: "sub" }),
            [BaseSuperscriptPlugin.key]: withProps(SlateLeaf, { as: "sup" }),
            [BaseTocPlugin.key]: TocElementStatic,
            [BaseTogglePlugin.key]: ToggleElementStatic,
            [BaseUnderlinePlugin.key]: withProps(SlateLeaf, { as: "u" }),
            [HEADING_KEYS.h1]: withProps(HeadingElementStatic, {
                variant: "h1",
            }),
            [HEADING_KEYS.h2]: withProps(HeadingElementStatic, {
                variant: "h2",
            }),
            [HEADING_KEYS.h3]: withProps(HeadingElementStatic, {
                variant: "h3",
            }),
            [HEADING_KEYS.h4]: withProps(HeadingElementStatic, {
                variant: "h4",
            }),
            [HEADING_KEYS.h5]: withProps(HeadingElementStatic, {
                variant: "h5",
            }),
            [HEADING_KEYS.h6]: withProps(HeadingElementStatic, {
                variant: "h6",
            }),

            [HadithPlugin.key]: HadithElementStatic,
        };

        const editorStatic = createSlateEditor({
            plugins: [
                BaseColumnPlugin,
                BaseColumnItemPlugin,
                BaseTocPlugin,
                BaseParagraphPlugin,
                BaseHeadingPlugin,
                BaseBoldPlugin,
                BaseItalicPlugin,
                BaseStrikethroughPlugin,
                BaseSubscriptPlugin,
                BaseSuperscriptPlugin,
                BaseUnderlinePlugin,
                BaseBlockquotePlugin,
                BaseDatePlugin,
                BaseIndentPlugin.extend({
                    inject: {
                        targetPlugins: [
                            BaseParagraphPlugin.key,
                            BaseBlockquotePlugin.key,
                        ],
                    },
                }),
                BaseIndentListPlugin.extend({
                    inject: {
                        targetPlugins: [
                            BaseParagraphPlugin.key,
                            ...HEADING_LEVELS,
                            BaseBlockquotePlugin.key,
                            BaseTogglePlugin.key,
                        ],
                    },
                    options: {
                        listStyleTypes: {
                            fire: {
                                liComponent: FireLiComponent,
                                markerComponent: FireMarker,
                                type: "fire",
                            },
                            todo: {
                                liComponent: TodoLiStatic,
                                markerComponent: TodoMarkerStatic,
                                type: "todo",
                            },
                        },
                    },
                }),
                BaseLinkPlugin,
                BaseHorizontalRulePlugin,
                BaseFontColorPlugin,
                BaseFontBackgroundColorPlugin,
                BaseFontSizePlugin,
                BaseKbdPlugin,
                BaseAlignPlugin.extend({
                    inject: {
                        targetPlugins: [
                            BaseParagraphPlugin.key,
                            ...HEADING_LEVELS,
                        ],
                    },
                }),
                BaseHighlightPlugin,
                BaseMentionPlugin,
                BaseTogglePlugin,
                HadithPlugin,
            ],
            value: editor.children,
        });

        const editorHtml = await serializeHtml(editorStatic, {
            components,
            editorComponent: EditorStatic,
            props: {
                style: { padding: "0 calc(50% - 350px)", paddingBottom: "" },
            },
        });

        const tailwindCss = `<link rel="stylesheet" href="${env.NEXT_PUBLIC_WEBSITE_URL}/tailwind.css">`;
        const katexCss = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.css" integrity="sha384-9PvLvaiSKCPkFKB1ZsEoTjgnJn+O3KvEwtsz37/XrkYft3DTk2gHdYvd9oWgW3tV" crossorigin="anonymous">`;

        const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=JetBrains+Mono:wght@400..700&display=swap"
          rel="stylesheet"
        />
        ${tailwindCss}
        ${katexCss}
        <style>
          :root {
            --font-sans: 'Inter', 'Inter Fallback';
            --font-mono: 'JetBrains Mono', 'JetBrains Mono Fallback';
          }
        </style>
      </head>
      <body>
        ${editorHtml}
      </body>
    </html>`;

        const url = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;

        await downloadFile(url, "plate.html");
    };

    // const exportToMarkdown = async () => {
    //     const md = editor.getApi(MarkdownPlugin).markdown.serialize();
    //     const url = `data:text/markdown;charset=utf-8,${encodeURIComponent(md)}`;
    //     await downloadFile(url, "plate.md");
    // };

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>تصدير</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <DropdownMenuItem onSelect={exportToHtml}>
                        تصدير كـ HTML
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={exportToPdf}>
                        تصدير كـ PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={exportToImage}>
                        تصدير كصورة
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onSelect={exportToMarkdown}>
                        تصدير كـ Markdown
                    </DropdownMenuItem> */}
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
}
