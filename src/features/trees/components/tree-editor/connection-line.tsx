import { cn } from "@/lib/utils";
import {
    type ConnectionLineComponentProps,
    getSmoothStepPath,
    useConnection,
} from "@xyflow/react";

const MARKER_END = "url('#custom-arrow-marker')";

export default function ConnectionLine({
    fromX,
    fromY,
    toX,
    toY,
    fromPosition,
    toPosition,
}: ConnectionLineComponentProps) {
    const { fromHandle, isValid } = useConnection();
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX: fromX,
        sourceY: fromY,
        sourcePosition: fromPosition,
        targetX: toX,
        targetY: toY,
        targetPosition: toPosition,
    });

    return (
        <g>
            <defs>
                <marker
                    id="custom-arrow-marker"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                    markerUnits="strokeWidth"
                >
                    <polygon
                        points="0,0 0,6 6,3"
                        fill="oklch(52.7% 0.154 150.069)"
                        stroke="oklch(52.7% 0.154 150.069)"
                    />
                </marker>
            </defs>

            <path
                d={edgePath}
                fill="none"
                stroke={
                    isValid
                        ? "oklch(52.7% 0.154 150.069)"
                        : "var(--xy-edge-stroke-default)"
                }
                className={cn(isValid && "animated")}
                markerEnd={isValid ? MARKER_END : undefined}
                strokeWidth={1.5}
            />
        </g>
    );
}
