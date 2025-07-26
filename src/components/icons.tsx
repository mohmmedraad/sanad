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
    LogOut,
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

export const LogoIcon = (props: IconProps) => (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
        width="81"
        height="81"
        viewBox="0 0 81 81"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M61.5631 3.30451C62.0633 2.03214 63.497 1.41424 64.7654 1.9244V1.9244C66.0338 2.43456 66.6566 3.87958 66.1564 5.15195L58.9721 23.4279L54.3789 21.5804L61.5631 3.30451Z"
            fill="#F46655"
        />
        <path
            d="M51.4258 31.5484L56.1541 33.006L43.2838 75.7232L38.5554 74.2656L51.4258 31.5484Z"
            fill="#F46655"
        />
        <circle cx="40.0387" cy="77.0228" r="3.97716" fill="#F46655" />
        <path
            d="M57.3682 28.5423L60.7719 24.9166L79.2068 42.6239C80.1972 43.5752 80.2381 45.1581 79.2982 46.1593V46.1593C78.3583 47.1605 76.7934 47.2009 75.803 46.2496L57.3682 28.5423Z"
            fill="#F46655"
        />
        <path
            d="M21.4959 5.5542C20.3539 4.78664 20.0406 3.23218 20.7961 2.08221V2.08221C21.5516 0.932246 23.0897 0.622241 24.2316 1.3898L52.0171 20.0661L49.2814 24.2305L21.4959 5.5542Z"
            fill="#F46655"
        />
        <path
            d="M46.4614 25.6779L48.3365 30.3042L4.18057 48.6156C2.90725 49.1436 1.45528 48.5361 0.937491 47.2585V47.2585C0.419702 45.981 1.03218 44.5173 2.30549 43.9893L46.4614 25.6779Z"
            fill="#F46655"
        />
        <path
            d="M53.3848 20.889C56.6265 20.8891 59.293 23.5537 59.293 26.889C59.293 30.2242 56.6265 32.8888 53.3848 32.889C50.1429 32.889 47.4756 30.2243 47.4756 26.889C47.4756 23.5536 50.1429 20.889 53.3848 20.889Z"
            stroke="#F46655"
            strokeWidth="4"
        />
    </svg>
);

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
export const LogOutIcon = (props: IconProps) => <LogOut {...props} />;
