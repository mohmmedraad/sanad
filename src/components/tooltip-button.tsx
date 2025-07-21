import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type TooltipButtonProps = React.ComponentProps<typeof Button> & {
    tooltip: React.ReactNode;
};
export default function ToolTipButton({
    tooltip,
    ...props
}: TooltipButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button {...props} />
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
    );
}
