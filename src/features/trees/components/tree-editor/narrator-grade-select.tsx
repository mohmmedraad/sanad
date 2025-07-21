import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { narratorGradesTranslation } from "@/constants";

type NarratorGradeSelectProps = React.ComponentProps<typeof Select> & {
    className: string;
};

export default function NarratorGradeSelect({
    className,
    ...props
}: NarratorGradeSelectProps) {
    return (
        <Select {...props}>
            <SelectTrigger id="custom-narrator-grade" className={className}>
                <SelectValue placeholder="اختر الدرجة" className="w-full" />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(narratorGradesTranslation).map(
                    ([value, text]) => (
                        <SelectItem key={value} value={value}>
                            {text}
                        </SelectItem>
                    ),
                )}
            </SelectContent>
        </Select>
    );
}
