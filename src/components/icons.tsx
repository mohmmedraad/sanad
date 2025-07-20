import {
    CircleAlert,
    Ellipsis,
    HelpCircle,
    Monitor,
    Moon,
    PlusCircle,
    Settings,
    Sun,
    Trash2,
    TreePine,
    Trees,
} from "lucide-react";
import type { JSX } from "react";
import type { SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGElement>, "ref">;
export type Icon = (props: IconProps) => JSX.Element;

export const MonitorIcon = (props: IconProps) => <Monitor {...props} />;
export const MoonIcon = (props: IconProps) => <Moon {...props} />;
export const SunIcon = (props: IconProps) => <Sun {...props} />;
export const HelpCircleIcon = (props: IconProps) => <HelpCircle {...props} />;
export const SettingsIcon = (props: IconProps) => <Settings {...props} />;
export const TreesIcon = (props: IconProps) => <Trees {...props} />;
export const CircleAlertIcon = (props: IconProps) => <CircleAlert {...props} />;
export const EllipsisIcon = (props: IconProps) => <Ellipsis {...props} />;
export const Trash2Icon = (props: IconProps) => <Trash2 {...props} />;
export const TreePineIcon = (props: IconProps) => <TreePine {...props} />;
export const PlusCircleIcon = (props: IconProps) => <PlusCircle {...props} />;
