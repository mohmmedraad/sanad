import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CircleAlertIcon } from "./icons";

type ConfirmActionAlertPorps = {
    title: string;
    children: React.ReactNode;
    description: string;
    onConfirm?: () => void;
    onCancel?: () => void;
};

export default function ConfirmActionAlert({
    title,
    children,
    description,
    onCancel,
    onConfirm,
}: ConfirmActionAlertPorps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent dir="rtl">
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                    <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                        aria-hidden="true"
                    >
                        <CircleAlertIcon className="size-4 opacity-80" />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>
                        ألغاء
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        تأكيد
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
