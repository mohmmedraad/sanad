"use client";

import {
    MarkdownPlugin,
    type MdMdxJsxTextElement,
    remarkMdx,
    remarkMention,
} from "@udecode/plate-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { THadithElement } from "./hadith-plugin";

export const markdownPlugin = MarkdownPlugin.configure({
    options: {
        disallowedNodes: [],
        remarkPlugins: [remarkMath, remarkGfm, remarkMdx, remarkMention],
        rules: {
            hadith: {
                deserialize(mdastNode: MdMdxJsxTextElement, deco, options) {
                    const value = mdastNode.attributes.reduce((curr, next) => {
                        // @ts-ignore
                        curr[next.name] = next.value;
                        return curr;
                    }, {});

                    return {
                        type: "hadith",
                        value: value,
                        children: [],
                    };
                },
                serialize: (slateNode: THadithElement): MdMdxJsxTextElement => {
                    const attributes = Object.keys(slateNode.value).map(
                        (key) => ({
                            type: "mdxJsxAttribute" as const,
                            name: key,
                            // @ts-ignore
                            value: slateNode.value[key],
                        }),
                    );
                    return {
                        type: "mdxJsxTextElement",
                        name: "hadith",
                        attributes,
                        children: [
                            {
                                type: "text",
                                value: slateNode.value.hadith,
                            },
                        ],
                    };
                },
            },
        },
    },
});
