import { cn } from "@/lib/utils";
import { useTreeEditorStore } from "@/store/tree-editor-store";
import { useLongPress } from "@uidotdev/usehooks";
import {
    type Edge,
    EdgeLabelRenderer,
    type EdgeProps,
    getSmoothStepPath,
} from "@xyflow/react";
import { useRef, useState } from "react";

export default function LabeledEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    markerEnd,
    interactionWidth = 20,
    ...props
}: EdgeProps<Edge<{ label: string }>>) {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [labelValue, setLabelValue] = useState(data?.label || "");
    const inputRef = useRef<HTMLInputElement>(null);
    const setEdges = useTreeEditorStore((state) => state.setEdges);
    const attrs = useLongPress(
        () => {
            setEdges((edges) => {
                const index = edges.findIndex((n) => n.id === id);
                if (index !== -1) edges.splice(index, 1);
            });
        },
        {
            threshold: 500,
        },
    );

    const handleDoubleClick = () => {};

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabelValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            saveLabel();
        } else if (e.key === "Escape") {
            cancelEdit();
        }
    };

    const saveLabel = () => {
        setIsEditing(false);
        setEdges((edges) => {
            const edge = edges.find((e) => e.id === id);

            if (!edge) {
                return;
            }

            edge.data = {
                label: labelValue,
            };
        });
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setLabelValue(data?.label || "");
    };

    return (
        <>
            <path
                {...props}
                id={id}
                d={edgePath}
                className={cn("react-flow__edge-path")}
                markerEnd={markerEnd}
                onDoubleClick={handleDoubleClick}
            />

            {interactionWidth && (
                <path
                    d={edgePath}
                    fill="none"
                    strokeOpacity={0}
                    strokeWidth={interactionWidth}
                    className="react-flow__edge-interaction"
                    {...attrs}
                    onDoubleClick={handleDoubleClick}
                />
            )}
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                        pointerEvents: "all",
                    }}
                    className={cn("cursor-pointer bg-white dark:bg-[#141414]", {
                        "p-2": isEditing || !!data?.label,
                    })}
                    onDoubleClick={handleDoubleClick}
                >
                    {isEditing && (
                        <input
                            ref={inputRef}
                            type="text"
                            style={{
                                width: `${Math.max(labelValue.length * 8, 50)}px`,
                            }}
                            value={labelValue}
                            onChange={handleInputChange}
                            onBlur={saveLabel}
                            onKeyDown={handleKeyDown}
                            className="border-none bg-transparent text-center outline-none"
                            // biome-ignore lint/a11y/noAutofocus: <explanation>
                            autoFocus
                        />
                    )}

                    {!isEditing && !!data?.label && (
                        <div className="text-nowrap!">{data.label}</div>
                    )}
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
