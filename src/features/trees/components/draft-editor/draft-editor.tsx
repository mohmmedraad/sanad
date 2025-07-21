import { PlateEditor } from "./plate-editor";

export default function DraftEditor() {
    return (
        <div
            className="relative h-[calc(100dvh-var(--header-hight))] w-full"
            data-registry="plate"
            dir="rtl"
        >
            <PlateEditor />
        </div>
    );
}
