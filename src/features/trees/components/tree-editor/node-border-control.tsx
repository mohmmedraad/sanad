import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NumberInput from "@/components/ui/number-input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { SpeakerNode } from "../../types/tree-editor";

interface NodeBorderControlProps {
    border: SpeakerNode["data"]["border"];
    onWidthChange: (width: number) => void;
    onStyleChange: (style: string) => void;
    onColorChange: (color: string) => void;
}

const borderStyles = ["solid", "dashed", "dotted"];

export function NodeBorderControl({
    border,
    onWidthChange,
    onStyleChange,
    onColorChange,
}: NodeBorderControlProps) {
    return (
        <div className="flex gap-2">
            <div className="space-y-2">
                <Label
                    htmlFor="border-width"
                    className="text-gray-500 text-xs dark:text-gray-300"
                >
                    السمك
                </Label>
                <NumberInput
                    id="border-width"
                    minValue={0}
                    defaultValue={border?.width}
                    className="w-full"
                    onChange={(e) => onWidthChange(e)}
                />
            </div>

            <div className="w-full space-y-2">
                <Label
                    htmlFor="border-style"
                    className="text-gray-500 text-xs dark:text-gray-300"
                >
                    النوع
                </Label>
                <Select
                    defaultValue={border?.style}
                    onValueChange={onStyleChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                        {borderStyles.map((borderStyle) => (
                            <SelectItem key={borderStyle} value={borderStyle}>
                                {borderStyle.charAt(0).toUpperCase() +
                                    borderStyle.slice(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="border-color"
                    className="text-gray-500 text-xs dark:text-gray-300"
                >
                    اللون
                </Label>
                <Input
                    id="border-color"
                    type="color"
                    defaultValue={border?.color}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="h-9 w-12 cursor-pointer p-0"
                />
            </div>
        </div>
    );
}
