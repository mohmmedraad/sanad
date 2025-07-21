import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NodeBackgroundControlProps {
    background?: string;
    onBackgroundChange: (color: string) => void;
}

export function NodeBackgroundControl({
    background,
    onBackgroundChange,
}: NodeBackgroundControlProps) {
    return (
        <div className="w-full space-y-2">
            <Label htmlFor="border-color">لون الخلفية</Label>
            <Input
                id="border-color"
                type="color"
                defaultValue={background}
                onChange={(e) => onBackgroundChange(e.target.value)}
                className="size-10 cursor-pointer p-0 shadow-none!"
            />
        </div>
    );
}
