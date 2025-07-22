import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    ArrowDown,
    ArrowDownLeft,
    ArrowDownRight,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    Bold,
    Calendar,
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Circle,
    CircleAlert,
    CircleHelp,
    Combine,
    Copy,
    Download,
    Ellipsis,
    Eraser,
    ExternalLink,
    GalleryVerticalEnd,
    Grid2X2,
    Grid3X3,
    GripVertical,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    HelpCircle,
    Highlighter,
    Italic,
    Link,
    Link2,
    List,
    ListCollapse,
    ListOrdered,
    ListTodo,
    LoaderCircle,
    Menu,
    Mic,
    Minus,
    Monitor,
    Moon,
    MoreHorizontal,
    PaintBucket,
    PanelLeft,
    Pilcrow,
    Plus,
    PlusCircle,
    Quote,
    Redo2,
    Search,
    Settings,
    Speech,
    Square,
    SquareSplitHorizontal,
    Strikethrough,
    Sun,
    Table,
    Text,
    Trash2,
    TreePine,
    Trees,
    Underline,
    Undo2,
    Ungroup,
    Unlink,
    X,
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
export const MoreHorizontalIcon = (props: IconProps) => (
    <MoreHorizontal {...props} />
);
export const Trash2Icon = (props: IconProps) => <Trash2 {...props} />;
export const TreePineIcon = (props: IconProps) => <TreePine {...props} />;
export const PlusCircleIcon = (props: IconProps) => <PlusCircle {...props} />;
export const ChevronDownIcon = (props: IconProps) => <ChevronDown {...props} />;
export const ChevronUpIcon = (props: IconProps) => <ChevronUp {...props} />;
export const ChevronLeftIcon = (props: IconProps) => <ChevronLeft {...props} />;
export const ChevronRightIcon = (props: IconProps) => (
    <ChevronRight {...props} />
);
export const LoaderCircleIcon = (props: IconProps) => (
    <LoaderCircle {...props} />
);
export const MicIcon = (props: IconProps) => <Mic {...props} />;
export const SearchIcon = (props: IconProps) => <Search {...props} />;
export const GalleryVerticalEndIcon = (props: IconProps) => (
    <GalleryVerticalEnd {...props} />
);
export const CheckIcon = (props: IconProps) => <Check {...props} />;
export const CircleIcon = (props: IconProps) => <Circle {...props} />;
export const XIcon = (props: IconProps) => <X {...props} />;
export const GripVerticalIcon = (props: IconProps) => (
    <GripVertical {...props} />
);
export const PanelLeftIcon = (props: IconProps) => <PanelLeft {...props} />;

export const AlignCenterIcon = (props: IconProps) => <AlignCenter {...props} />;
export const AlignJustifyIcon = (props: IconProps) => (
    <AlignJustify {...props} />
);
export const AlignLeftIcon = (props: IconProps) => <AlignLeft {...props} />;
export const AlignRightIcon = (props: IconProps) => <AlignRight {...props} />;
export const EraserIcon = (props: IconProps) => <Eraser {...props} />;
export const PlusIcon = (props: IconProps) => <Plus {...props} />;
export const MinusIcon = (props: IconProps) => <Minus {...props} />;
export const ListCollapseIcon = (props: IconProps) => (
    <ListCollapse {...props} />
);
export const ListTodoIcon = (props: IconProps) => <ListTodo {...props} />;
export const ListIcon = (props: IconProps) => <List {...props} />;
export const ListOrderedIcon = (props: IconProps) => <ListOrdered {...props} />;
export const LinkIcon = (props: IconProps) => <Link {...props} />;
export const ArrowDownLeftIcon = (props: IconProps) => (
    <ArrowDownLeft {...props} />
);
export const ArrowDownRightIcon = (props: IconProps) => (
    <ArrowDownRight {...props} />
);

export const CircleHelpIcon = (props: IconProps) => <CircleHelp {...props} />;
export const Redo2Icon = (props: IconProps) => <Redo2 {...props} />;
export const Undo2Icon = (props: IconProps) => <Undo2 {...props} />;
export const BoldIcon = (props: IconProps) => <Bold {...props} />;
export const HighlighterIcon = (props: IconProps) => <Highlighter {...props} />;
export const ItalicIcon = (props: IconProps) => <Italic {...props} />;
export const StrikethroughIcon = (props: IconProps) => (
    <Strikethrough {...props} />
);
export const UnderlineIcon = (props: IconProps) => <Underline {...props} />;

export const ArrowDownIcon = (props: IconProps) => <ArrowDown {...props} />;
export const ArrowLeftIcon = (props: IconProps) => <ArrowLeft {...props} />;
export const ArrowRightIcon = (props: IconProps) => <ArrowRight {...props} />;
export const ArrowUpIcon = (props: IconProps) => <ArrowUp {...props} />;
export const CalendarIcon = (props: IconProps) => <Calendar {...props} />;
export const CombineIcon = (props: IconProps) => <Combine {...props} />;
export const ExternalLinkIcon = (props: IconProps) => (
    <ExternalLink {...props} />
);
export const Grid2X2Icon = (props: IconProps) => <Grid2X2 {...props} />;
export const Grid3X3Icon = (props: IconProps) => <Grid3X3 {...props} />;
export const Heading1Icon = (props: IconProps) => <Heading1 {...props} />;
export const Heading2Icon = (props: IconProps) => <Heading2 {...props} />;
export const Heading3Icon = (props: IconProps) => <Heading3 {...props} />;
export const Heading4Icon = (props: IconProps) => <Heading4 {...props} />;
export const Link2Icon = (props: IconProps) => <Link2 {...props} />;
export const PaintBucketIcon = (props: IconProps) => <PaintBucket {...props} />;
export const PilcrowIcon = (props: IconProps) => <Pilcrow {...props} />;
export const QuoteIcon = (props: IconProps) => <Quote {...props} />;
export const SpeechIcon = (props: IconProps) => <Speech {...props} />;
export const SquareIcon = (props: IconProps) => <Square {...props} />;
export const SquareSplitHorizontalIcon = (props: IconProps) => (
    <SquareSplitHorizontal {...props} />
);
export const TableIcon = (props: IconProps) => <Table {...props} />;
export const TextIcon = (props: IconProps) => <Text {...props} />;
export const UngroupIcon = (props: IconProps) => <Ungroup {...props} />;
export const UnlinkIcon = (props: IconProps) => <Unlink {...props} />;
export const MenuIcon = (props: IconProps) => <Menu {...props} />;
export const DownloadIcon = (props: IconProps) => <Download {...props} />;
export const CopyIcon = (props: IconProps) => <Copy {...props} />;
