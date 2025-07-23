import type { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
    title: "الملف الشخصي",
};

export default function ProfilePage() {
    redirect("/profile/trees");
    return null;
}
