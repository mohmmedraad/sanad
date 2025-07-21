"use client";

import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { getEditorDOMFromHtmlString } from "@udecode/plate";
import { MarkdownPlugin } from "@udecode/plate-markdown";
import { useEditorRef } from "@udecode/plate/react";
import { useFilePicker } from "use-file-picker";

import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

type ImportType = "html" | "markdown";

export function ImportToolbarButton(props: DropdownMenuProps) {
    const editor = useEditorRef();

    const getFileNodes = (text: string, type: ImportType) => {
        if (type === "html") {
            const editorNode = getEditorDOMFromHtmlString(text);
            const nodes = editor.api.html.deserialize({
                element: editorNode,
            });

            return nodes;
        }

        if (type === "markdown") {
            return editor.getApi(MarkdownPlugin).markdown.deserialize(text);
        }

        return [];
    };

    const { openFilePicker: openMdFilePicker } = useFilePicker({
        accept: [".md", ".mdx"],
        multiple: false,
        // @ts-ignore
        onFilesSelected: async ({ plainFiles }) => {
            const text = await plainFiles[0].text();

            const nodes = getFileNodes(text, "markdown");

            editor.tf.insertNodes(nodes);
        },
    });

    const { openFilePicker: openHtmlFilePicker } = useFilePicker({
        accept: ["text/html"],
        multiple: false,
        // @ts-ignore
        onFilesSelected: async ({ plainFiles }) => {
            const text = await plainFiles[0].text();

            const nodes = getFileNodes(text, "html");

            editor.tf.insertNodes(nodes);
        },
    });

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>استيراد</DropdownMenuSubTrigger>

            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onSelect={() => {
                                openHtmlFilePicker();
                            }}
                        >
                            استيراد من HTML
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onSelect={() => {
                                openMdFilePicker();
                            }}
                        >
                            استيراد من Markdown
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
}
