import type {
    CurrentDragedNode,
    Edge,
    Node,
} from "@/features/trees/types/tree-editor";
import type { OmitFunctions } from "@/lib/utils";
import { apiFetch, isAPIClientError } from "@/trpc/react";
import type { Layout } from "@/types";

import type { Value } from "@udecode/plate";
import {
    type OnConnect,
    type OnEdgesChange,
    type OnNodesChange,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
} from "@xyflow/react";
import { toast } from "sonner";
import { temporal } from "zundo";
import { create } from "zustand";
import { createDebouncedJSONStorage } from "zustand-debounce";
import { type StateStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";

type TreeEditorStore = {
    id: string | undefined;
    nodes: Node[];
    edges: Edge[];
    draft: Value;
    title: string;
    layout: Layout;
    miniMap: boolean;
    activeNode: string | null;
    isEditorFocus: boolean;
    currentDragedNode: CurrentDragedNode | null;

    init: (
        initialState: Omit<
            OmitFunctions<TreeEditorStore>,
            "currentDragedNode" | "activeNode"
        >,
    ) => void;
    setId: (id: string) => void;
    setDraft: (draft: Value) => void;
    setTitle: (id: string) => void;
    setNodes: (updater: (nodes: Node[]) => void) => void;
    setEdges: (updater: (edges: Edge[]) => void) => void;
    onConnect: OnConnect;
    setLayout: (layout: Layout) => void;
    setMiniMap: (updater: (show: boolean) => boolean) => void;
    setActiveNode: (id: string | null) => void;
    onNodesChange: OnNodesChange<Node>;
    onEdgesChange: OnEdgesChange;
    setIsEditorFocus: (updater: (show: boolean) => boolean) => void;
    setCurrentDragedNode: (node: CurrentDragedNode) => void;
};

let abortController: AbortController | null = null;

const createTreeStorage: () => StateStorage = () => {
    return {
        getItem: async () => {
            return null;
        },

        setItem: async (_name: string, value: string): Promise<void> => {
            const { state } = JSON.parse(value) as {
                state: OmitFunctions<TreeEditorStore>;
            };

            if (abortController) {
                abortController.abort();
            }

            abortController = new AbortController();

            try {
                await apiFetch.trees.update.mutate(
                    {
                        id: state.id as string,
                        draft: state.draft,
                        title: state.title,
                        nodes: state.nodes,
                        edges: state.edges,
                        showMiniMap: state.miniMap,
                    },
                    {
                        signal: abortController.signal,
                    },
                );
            } catch (error) {
                if (!isAPIClientError(error)) {
                    toast.error("حدث خطأ ما");
                    return;
                }

                if (error.cause?.name === "AbortError") {
                    return;
                }

                const errorCode = error.data?.code;

                if (errorCode === "NOT_FOUND") {
                    // TODO: handle redirection
                    return;
                }

                toast.error("حدث خطأ ما");
            }
        },

        removeItem: async (): Promise<void> => {
            if (abortController) {
                abortController.abort();
            }
        },
    };
};

export const useTreeEditorStore = create<TreeEditorStore>()(
    persist(
        temporal(
            immer((set, get) => ({
                id: undefined,
                nodes: [],
                edges: [],
                draft: [],
                title: "",
                layout: "tree-editor",
                miniMap: true,
                activeNode: null,
                isEditorFocus: false,
                currentDragedNode: null,

                init: (values) =>
                    set({
                        ...values,
                    }),

                setId: (id) =>
                    set({
                        id,
                    }),

                setDraft: (value) =>
                    set({
                        draft: value,
                    }),

                setLayout: (layout) =>
                    set({
                        layout,
                    }),

                setNodes: (updater) => set((state) => updater(state.nodes)),

                setEdges: (updater) => set((state) => updater(state.edges)),

                setTitle: (title) =>
                    set({
                        title,
                    }),

                onConnect: (connection) =>
                    set({
                        edges: addEdge(connection, get().edges),
                    }),

                setMiniMap: (updater) =>
                    set({
                        miniMap: updater(get().miniMap),
                    }),

                setActiveNode: (id) =>
                    set({
                        activeNode: id,
                    }),

                onNodesChange: (changes) =>
                    set({
                        nodes: applyNodeChanges(changes, get().nodes),
                    }),

                onEdgesChange: (changes) => {
                    set({
                        edges: applyEdgeChanges(changes, get().edges),
                    });
                },

                setIsEditorFocus: (updater) =>
                    set({
                        isEditorFocus: updater(get().isEditorFocus),
                    }),

                setCurrentDragedNode: (node) =>
                    set({ currentDragedNode: node }),
            })),
            {
                limit: 50,
                partialize: ({ nodes, edges }) => ({
                    nodes,
                    edges,
                }),
                equality(pastState, currentState) {
                    return shallow(pastState, currentState);
                },
            },
        ),
        {
            name: "sanad-db",
            storage: createDebouncedJSONStorage(createTreeStorage(), {
                debounceTime: 1000,
                onWrite: () => {
                    if (abortController) {
                        abortController.abort();
                    }
                },
            }),
        },
    ),
);
