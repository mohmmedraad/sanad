import { PlusCircleIcon } from "@/components/icons";
import RequireAuth from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CreateTreeButton from "@/features/trees/components/create-tree-button";
import TreeList from "@/features/trees/components/tree-list";
import { api } from "@/trpc/server";

async function ProfileTreesPage() {
    const initialTrees = await api.trees.list({});

    return (
        <div className="@container" dir="rtl">
            <div className="sticky top-0 bg-background pt-4">
                <CreateTreeButton>
                    <Button variant="outline" className="mr-4 lg:mr-6">
                        <PlusCircleIcon />
                        اضافة شجرة
                    </Button>
                </CreateTreeButton>
                <Separator className="my-4" />
            </div>
            <TreeList
                initialTrees={initialTrees}
                className="grid @2xl:grid-cols-4 @md:grid-cols-2 @xl:grid-cols-3 gap-4 px-4 lg:px-6"
            />
        </div>
    );
}

export default RequireAuth(ProfileTreesPage);
