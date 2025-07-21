import { useTreeEditorStore } from "@/store/tree-editor-store";
import { useEditorState } from "@udecode/plate/react";
import { useIsFirstRender } from "@uidotdev/usehooks";
import { useEffect } from "react";

export const usePersistDraft = () => {
    const editor = useEditorState();
    const setDraft = useTreeEditorStore((state) => state.setDraft);
    const isFirstRender = useIsFirstRender();
    const editorValue = editor.children;

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (!isFirstRender) {
            setDraft(editorValue);
        }
    }, [editorValue]);
};
