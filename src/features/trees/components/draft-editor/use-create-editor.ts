"use client";

import type { Value } from "@udecode/plate";

import { withProps } from "@udecode/cn";
import {
    BoldPlugin,
    ItalicPlugin,
    StrikethroughPlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { DatePlugin } from "@udecode/plate-date/react";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { TocPlugin } from "@udecode/plate-heading/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { LinkPlugin } from "@udecode/plate-link/react";
import {
    MentionInputPlugin,
    MentionPlugin,
} from "@udecode/plate-mention/react";
import { SlashInputPlugin } from "@udecode/plate-slash-command/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import {
    type CreatePlateEditorOptions,
    ParagraphPlugin,
    PlateLeaf,
    usePlateEditor,
} from "@udecode/plate/react";

import { BlockquoteElement } from "./blockquote-element";
import { DateElement } from "./date-element";
import { HeadingElement } from "./heading-element";
import { HighlightLeaf } from "./highlight-leaf";
import { HrElement } from "./hr-element";
import { KbdLeaf } from "./kbd-leaf";
import { LinkElement } from "./link-element";
import { MentionElement } from "./mention-element";
import { MentionInputElement } from "./mention-input-element";
import { ParagraphElement } from "./paragraph-element";
import { withPlaceholders } from "./placeholder";
import { editorPlugins } from "./plugins/editor-plugins";
import { FloatingToolbarPlugin } from "./plugins/floating-toolbar-plugin";
import { HadithElement, HadithPlugin } from "./plugins/hadith-plugin";
import { SlashInputElement } from "./slash-input-element";
import { TocElement } from "./toc-element";
import { ToggleElement } from "./toggle-element";

export const viewComponents = {
    [BlockquotePlugin.key]: BlockquoteElement,
    [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
    [DatePlugin.key]: DateElement,
    [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
    [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
    [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
    [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
    [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
    [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
    [HighlightPlugin.key]: HighlightLeaf,
    [HorizontalRulePlugin.key]: HrElement,
    [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
    [KbdPlugin.key]: KbdLeaf,
    [LinkPlugin.key]: LinkElement,
    [MentionPlugin.key]: MentionElement,
    [ParagraphPlugin.key]: ParagraphElement,
    [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
    [SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
    [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
    [TocPlugin.key]: TocElement,
    [TogglePlugin.key]: ToggleElement,
    [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),

    [HadithPlugin.key]: HadithElement,
};

export const editorComponents = {
    ...viewComponents,
    [MentionInputPlugin.key]: MentionInputElement,
    [SlashInputPlugin.key]: SlashInputElement,
};

export const useCreateEditor = (
    {
        components,
        override,
        placeholders,
        readOnly,
        ...options
    }: {
        components?: Record<string, unknown>;
        placeholders?: boolean;
        plugins?: unknown[];
        readOnly?: boolean;
    } & Omit<CreatePlateEditorOptions, "plugins"> = {},
    deps: unknown[] = [],
) => {
    return usePlateEditor<Value, (typeof editorPlugins)[number]>(
        {
            override: {
                components: {
                    ...(readOnly
                        ? viewComponents
                        : placeholders
                          ? // @ts-ignore
                            withPlaceholders(editorComponents)
                          : editorComponents),
                    ...components,
                },
                ...override,
            },
            // @ts-ignore
            plugins: [...editorPlugins, FloatingToolbarPlugin],
            value: [],
            ...options,
        },
        deps,
    );
};
