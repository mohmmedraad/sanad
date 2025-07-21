"use client";

import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { HEADING_LEVELS } from "@udecode/plate-heading";
import { IndentListPlugin } from "@udecode/plate-indent-list/react";
import { IndentPlugin } from "@udecode/plate-indent/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import { ParagraphPlugin } from "@udecode/plate/react";
import { FireLiComponent, FireMarker } from "../indent-fire-marker";
import { TodoLi, TodoMarker } from "../indent-todo-marker";

export const indentListPlugins = [
    IndentPlugin.extend({
        inject: {
            nodeProps: {
                // @ts-ignore
                transformStyle: (options) => ({
                    marginLeft: 0,
                    marginInlineStart: 24,
                }),
            },
            targetPlugins: [
                ParagraphPlugin.key,
                ...HEADING_LEVELS,
                BlockquotePlugin.key,
                TogglePlugin.key,
            ],
        },
    }),
    IndentListPlugin.extend({
        inject: {
            targetPlugins: [
                ParagraphPlugin.key,
                ...HEADING_LEVELS,
                BlockquotePlugin.key,
                TogglePlugin.key,
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
                    liComponent: TodoLi,
                    markerComponent: TodoMarker,
                    type: "todo",
                },
            },
        },
    }),
];
