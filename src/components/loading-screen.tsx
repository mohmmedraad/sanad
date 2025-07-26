"use client";

import { LoaderCircleIcon } from "@/components/icons";
import { useState } from "react";

const islamicReminders = [
    "صلِّ على محمد ﷺ",
    "استغفر الله العظيم",
    "سبحان الله وبحمده",
    "لا إله إلا الله",
    "الحمد لله رب العالمين",
    "اللهم اغفر لي ذنبي",
    "لا حول ولا قوة إلا بالله",
];

export default function LoadingScreen() {
    const [currentReminder] = useState(
        Math.floor(Math.random() * islamicReminders.length),
    );

    return (
        <div className="text-center">
            <div
                className="flex items-center justify-center space-x-3"
                dir="rtl"
            >
                <LoaderCircleIcon className="size-4 animate-spin text-primary" />
                <p className="font-medium text-lg text-primary">
                    {islamicReminders[currentReminder]}
                </p>
            </div>
        </div>
    );
}
