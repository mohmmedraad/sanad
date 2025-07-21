import type { Hadith } from "@/types";
import type { TElement } from "@udecode/plate";
import {
    PlateElement,
    type PlateElementProps,
    createPlatePlugin,
} from "@udecode/plate/react";

export const HADITH_KEY = "hadith";

export const HadithPlugin = createPlatePlugin({
    key: HADITH_KEY,
    node: {
        isElement: true,
        component: HadithElement,
    },
}).extendEditorTransforms(({ editor, type }) => ({
    insert: {
        hadith: ({ key, value }: { key: string; value: Hadith }) => {
            editor.tf.insertNodes({
                key,
                children: [],
                type,
                value,
            });
        },
    },
}));

export interface THadithElement extends TElement {
    value: Hadith;
}

export function HadithElement(props: PlateElementProps<THadithElement>) {
    const { element } = props;

    return (
        <PlateElement
            as="div"
            {...props}
            attributes={{
                ...props.attributes,
                contentEditable: false,
            }}
        >
            <RenderHadith hadith={element.value} />
        </PlateElement>
    );
}

export function RenderHadith({ hadith }: { hadith: Hadith }) {
    return (
        <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-950">
            <p className="text-gray-800 text-xl dark:text-gray-200">
                {hadith.hadith}
            </p>

            <div className="mt-3 inline-flex flex-wrap gap-2">
                <div className="inline-flex shrink-0 gap-0.5 text-muted-foreground/70">
                    الراوي:
                    <div className="text-muted-foreground">{hadith.rawi}</div>
                </div>

                <div className="inline-flex shrink-0 gap-0.5 text-muted-foreground/70">
                    المحدث:
                    <div className="text-muted-foreground">
                        {hadith.mohdith}
                    </div>
                </div>

                <div className="inline-flex shrink-0 gap-0.5 text-muted-foreground/70">
                    المصدر:
                    <div className="text-muted-foreground">{hadith.book}</div>
                </div>

                <div className="inline-flex shrink-0 gap-0.5 text-muted-foreground/70">
                    الجزء أو الصفحة:
                    <div className="text-muted-foreground">
                        {hadith.numberOrPage}
                    </div>
                </div>

                <div className="inline-flex gap-0.5 text-muted-foreground/70">
                    <div className="shrink-0">حكم المحدث:</div>
                    <div className="text-muted-foreground">{hadith.grade}</div>
                </div>
            </div>
        </div>
    );
}

import type { SlateElementProps } from "@udecode/plate";

import { SlateElement } from "@udecode/plate";

export function HadithElementStatic(props: SlateElementProps<THadithElement>) {
    console.log(props);
    return (
        <SlateElement {...props} as="div">
            <RenderHadith hadith={props.element.value} />
        </SlateElement>
    );
}
