import { useTreeEditorStore } from "@/store/tree-editor-store";
import { useReactFlow } from "@xyflow/react";
import { useCallback, useRef } from "react";
import { toast } from "sonner";
import { convertMindMupToReactFlow, findPositionNodes } from "../../lib/utils";
import { mindmupFileSchema } from "../../schema/tree-editor";

export const useImportFromMindmup = () => {
    const nodes = useTreeEditorStore((state) => state.nodes);
    const setNodes = useTreeEditorStore((state) => state.setNodes);
    const setEdges = useTreeEditorStore((state) => state.setEdges);
    const { setCenter } = useReactFlow();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            console.log(file);

            if (!file) return;

            if (file.type !== "text/x-mup") {
                return toast.error("الملف غير مدعوم");
            }

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const jsonData = JSON.parse(e.target?.result as string);
                    const { data, success, error } =
                        mindmupFileSchema.safeParse(jsonData);

                    if (!success) {
                        return toast.error("الملف غير صالح");
                    }

                    const start = findPositionNodes(nodes);

                    const { nodes: newNodes, edges: newEdges } =
                        await convertMindMupToReactFlow(data, {
                            layout: {
                                rootX: (start?.maxXNode?.position.x || 0) + 200,
                                rootY: start?.minYNode?.position.y,
                            },
                        });

                    setNodes((nodes) => {
                        nodes.push(...newNodes);
                    });
                    setEdges((edges) => {
                        edges.push(...newEdges);
                    });

                    setTimeout(() => {
                        const firstNode = newNodes.at(0);
                        if (firstNode) {
                            setCenter(
                                firstNode.position.x +
                                    (firstNode.width || 190) / 2,
                                firstNode.position.y +
                                    (firstNode.height || 50) / 2,
                                {
                                    duration: 200,
                                    zoom: 1.2,
                                },
                            );
                        }
                    }, 0);
                } catch (error) {
                    toast.error("الملف غير صالح");
                    console.error("Import error:", error);
                }
            };
            reader.readAsText(file);

            event.target.value = "";
        },
        [nodes, setNodes, setEdges, setCenter],
    );

    const openFilePicker = useCallback(() => {
        inputRef.current?.click();
    }, []);

    return { inputRef, openFilePicker, handleFileUpload };
};
