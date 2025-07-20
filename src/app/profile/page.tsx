import { redirect } from "next/navigation";

export default function ProfilePage() {
    redirect("/profile/trees");
    return null;
}
