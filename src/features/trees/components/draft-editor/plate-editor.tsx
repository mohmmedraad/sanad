"use client";

import { Editor, EditorContainer } from "./editor";
import { FixedToolbar } from "./fixed-toolbar";
import { FixedToolbarButtons } from "./fixed-toolbar-buttons";
import Persist from "./persis";

export function PlateEditor() {
    return (
        <>
            <Persist />
            <EditorContainer dir="rtl">
                <Editor />
            </EditorContainer>

            <FixedToolbar>
                <FixedToolbarButtons />
            </FixedToolbar>
        </>
    );
}
