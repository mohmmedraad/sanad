"use client";

import { useTreeEditorStore } from "@/store/tree-editor-store";
import type { Tree } from "@/types";
import { Plate } from "@udecode/plate/react";
import { ReactFlowProvider } from "@xyflow/react";
import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraftEditor from "./draft-editor/draft-editor";
import { useCreateEditor } from "./draft-editor/use-create-editor";
import { LayoutViewer } from "./layout-viewer";
import { TreeEditor } from "./tree-editor/tree-editor";

type EditorProps = {
    tree: Tree;
};

export default function Editor({ tree }: EditorProps) {
    const editor = useCreateEditor({
        placeholders: true,
        value: tree.draft,
    });

    const init = useTreeEditorStore((state) => state.init);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        init({
            ...tree,
            layout: "tree-editor",
            isEditorFocus: false,
            miniMap: tree.showMiniMap,
        });
    }, [tree]);

    return (
        <ReactFlowProvider>
            <DndProvider backend={HTML5Backend}>
                <Plate editor={editor}>
                    <LayoutViewer
                        editor={<TreeEditor />}
                        draft={<DraftEditor />}
                    />
                </Plate>
            </DndProvider>
        </ReactFlowProvider>
    );
}
