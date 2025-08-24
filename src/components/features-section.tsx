"use client";

import {
    ImportIcon,
    NotebookPenIcon,
    StarIcon,
    UserPlusIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import MaxWidthWrapper from "./max-width-wrapper";

const features = [
    {
        title: "إضافة الرواة",
        video: "/videos/1.mp4",
        description: "إضافة الراوي يدويًا أو من قائمة الرواة المتوفرة",
        icon: UserPlusIcon,
    },
    {
        title: "تمييز الرواة",
        video: "/videos/2.mp4",
        description: "تمييز الرواة تلقائيًا حسب درجتهم في علم الحديث",
        icon: StarIcon,
    },
    {
        title: "كتابة الملاحظات",
        video: "/videos/3.mp4",
        description: "مسودة لكتابة أفكارك واستنتاجاتك حول السند",
        icon: NotebookPenIcon,
    },
    {
        title: "الاستيراد من MindMup",
        video: "/videos/4.mp4",
        description: "استيراد المخططات من MindMup بسهولة",
        icon: ImportIcon,
    },
];

export default function FeaturesSection() {
    const [activeFeature, setActiveFeature] = useState<number>(0);
    const currentFeature = features.at(activeFeature);

    return (
        <section className="pt-24 pb-10">
            <MaxWidthWrapper className="flex flex-col gap-4 md:grid-cols-2 md:flex-row">
                <div className="grid shrink-0 gap-4">
                    {features.map((f, i) => (
                        <button
                            type="button"
                            className="block w-full"
                            key={f.title}
                            onClick={() => setActiveFeature(i)}
                        >
                            <div
                                className={cn(
                                    "relative rounded-2xl p-4 text-start transition-all duration-75 hover:bg-[#00000003] dark:hover:bg-gray-900",
                                    i === activeFeature &&
                                        "bg-[#00000003] dark:bg-gray-900",
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <f.icon className="size-4 text-gray-900 dark:text-gray-50" />
                                    <h3 className="text-gray-800 text-xl dark:text-gray-50">
                                        {f.title}
                                    </h3>
                                </div>
                                <p className="pt-2 text-base text-gray-700 dark:text-gray-100">
                                    {f.description}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="relative inset-shadow-2xs aspect-video w-full overflow-hidden rounded-2xl border bg-background shadow-lg shadow-zinc-950/15 ring-1 ring-background dark:inset-shadow-white/20">
                    <div
                        aria-hidden
                        className="absolute inset-0 z-10 bg-linear-to-b from-70% from-transparent to-white"
                    />
                    <video
                        loop
                        muted
                        autoPlay
                        src={currentFeature?.video}
                        className="size-full object-cover"
                    />
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
