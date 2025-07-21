import type { NarratorsTable } from "@/client-db/schema";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { NarratorBadge } from "@/features/trees/components/tree-editor/narrator-badge";

interface NarratorTooltipProps
    extends React.ComponentProps<typeof TooltipTrigger> {
    narrator: NarratorsTable | undefined;
    children: React.ReactNode;
}

export default function NarratorTooltip({
    narrator,
    children,
    ...props
}: NarratorTooltipProps) {
    return (
        <Tooltip>
            <TooltipTrigger {...props}>{children}</TooltipTrigger>

            <TooltipContent variant="secondary" className="max-w-[300px]">
                <ul className="grid gap-3 text-xs">
                    <li className="grid gap-1">
                        <span className="text-muted-foreground">
                            الاسم الكامل
                        </span>
                        <span className="font-medium text-foreground">
                            {narrator?.fullName}
                        </span>
                    </li>
                    <li className="grid gap-1">
                        <span className="text-muted-foreground">الدرحة</span>
                        <NarratorBadge
                            variant={narrator?.grade}
                            className="h-max shrink-0"
                        >
                            {narrator?.gradeAr}
                        </NarratorBadge>
                    </li>
                    <li className="grid gap-1">
                        <span className="text-muted-foreground">
                            تاريخ الولادة
                        </span>
                        <span className="font-medium text-foreground">
                            {narrator?.dateBirth
                                ? narrator.dateBirth
                                : "غير معروف"}
                        </span>
                    </li>
                    <li className="grid gap-1">
                        <span className="text-muted-foreground">
                            تاريخ الوفاة
                        </span>
                        <span className="font-medium text-foreground">
                            {narrator?.dateDeath
                                ? narrator.dateDeath
                                : "غير معروف"}
                        </span>
                    </li>
                    {narrator?.places?.length ? (
                        <li className="grid gap-1">
                            <span className="text-muted-foreground">
                                الاماكن
                            </span>
                            <span className="space-x-1 font-medium text-foreground">
                                {narrator?.places.join(", ")}
                            </span>
                        </li>
                    ) : null}
                </ul>
            </TooltipContent>
        </Tooltip>
    );
}
