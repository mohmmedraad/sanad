"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type CustomBreadcrumbProps = React.ComponentProps<typeof Breadcrumb> & {
    links: { name: string; href: string }[];
    isLastLinkClickable?: boolean;
};

export default function CustomBreadcrumb({
    links,
    isLastLinkClickable = false,
    ...props
}: CustomBreadcrumbProps) {
    const isOneLink = links?.length === 1;

    return (
        <Breadcrumb {...props}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">الرئيسية</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {isOneLink ? (
                    <BreadcrumbItem>
                        {isLastLinkClickable ? (
                            <BreadcrumbLink href={links[0]?.href}>
                                {links[0]?.name}
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage>{links[0]?.name}</BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                ) : (
                    <>
                        {links?.slice(0, -1).map((link, index) => (
                            <BreadcrumbItem key={link.href}>
                                <BreadcrumbPage>{link.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        ))}
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {isLastLinkClickable ? (
                                <BreadcrumbLink href={links.at(-1)?.href}>
                                    {links?.at(-1)?.name}
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>
                                    {links?.at(-1)?.name}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
