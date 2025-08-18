import { Label } from "@/components/ui/label";
import NumberInput from "@/components/ui/number-input";
import {
    useTreeEditorStore,
    useTreeInteractionStore,
} from "@/store/tree-editor-store";
import { memo, useCallback, useId } from "react";
import { changeNodes } from "../../lib/utils";

export default function NodeLayoutController() {
    const setNodes = useTreeEditorStore((state) => state.setNodes);
    const nodes = useTreeEditorStore((state) => state.nodes);
    const activeNode = useTreeInteractionStore((state) => state.activeNode);

    const node = nodes.find((node) => node.id === activeNode);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const handleXChange = useCallback(
        (value: number) =>
            setNodes((nodes) =>
                changeNodes(nodes, node?.id as string, (node) => {
                    node.position.x = value;
                }),
            ),
        [node?.position.x],
    );
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const handleYChange = useCallback(
        (value: number) =>
            setNodes((nodes) =>
                changeNodes(nodes, node?.id as string, (node) => {
                    node.position.y = value;
                }),
            ),
        [node?.position.y],
    );
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const handleWChange = useCallback(
        (value: number) =>
            setNodes((nodes) =>
                changeNodes(nodes, node?.id as string, (node) => {
                    node.width = value;
                }),
            ),
        [node?.width],
    );
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const handleHChange = useCallback(
        (value: number) =>
            setNodes((nodes) =>
                changeNodes(nodes, node?.id as string, (node) => {
                    node.height = value;
                }),
            ),
        [node?.height],
    );

    return (
        <div className="mt-5 grid grid-cols-2 gap-3">
            <NodeLayoutInput
                label="X"
                value={node?.position.x}
                onValeuChange={handleXChange}
            />

            <NodeLayoutInput
                label="Y"
                value={node?.position.y}
                onValeuChange={handleYChange}
            />

            <NodeLayoutInput
                label="W"
                value={node?.width}
                minValue={190}
                onValeuChange={handleWChange}
            />

            <NodeLayoutInput
                label="H"
                value={node?.height}
                minValue={50}
                onValeuChange={handleHChange}
            />
        </div>
    );
}

const NodeLayoutInput = memo(
    ({
        label,
        value,
        onValeuChange,
        minValue,
        maxValue,
    }: {
        label: string;
        value?: number;
        minValue?: number;
        maxValue?: number;
        onValeuChange: (value: number) => void;
    }) => {
        const id = useId();
        return (
            <div className="flex items-center gap-2">
                <Label className="text-sm" htmlFor={id}>
                    {label}
                </Label>
                <NumberInput
                    id={id}
                    value={value}
                    aria-label={label}
                    onChange={onValeuChange}
                    minValue={minValue}
                    maxValue={maxValue}
                />
            </div>
        );
    },
);
