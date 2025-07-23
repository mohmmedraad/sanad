import RequireAuth from "@/components/require-auth";
import Editor from "@/features/trees/components/editor";
import TreeEditorHeader from "@/features/trees/components/tree-editor-header";
import { api } from "@/trpc/server";
import type { AuthenticatedPageProps } from "@/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type EditTreePageProps = AuthenticatedPageProps & {
    params: Promise<{
        treeId?: string;
    }>;
};

export const generateMetadata = async ({
    params,
}: EditTreePageProps): Promise<Metadata> => {
    const { treeId } = await params;

    if (!treeId) {
        notFound();
    }

    const tree = await api.trees.get({
        id: treeId,
    });

    return {
        title: tree.data.title,
    };
};

async function EditTreePage({ params }: EditTreePageProps) {
    const { treeId } = await params;

    if (!treeId) {
        notFound();
        return;
    }

    const tree = await api.trees.get({
        id: treeId,
    });

    if (!tree?.data) {
        notFound();
        return;
    }

    return (
        <>
            <TreeEditorHeader />
            <Editor tree={tree.data} />
        </>
    );
}

export default RequireAuth(EditTreePage);
