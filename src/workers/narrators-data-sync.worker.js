import { clientDB } from "@/client-db";
import { apiFetch } from "@/trpc/react";

const onMessage = async (
    // @ts-ignore
    event,
) => {
    console.log("[Worker] Message received:", event.data);

    try {
        const localNarratorsVersion = event.data.localNarratorsVersion;

        const { data: version } = await apiFetch.narrators.version.query();

        console.log("[Worker] Server version:", version);
        console.log("[Worker] Local version:", localNarratorsVersion);

        if (version === localNarratorsVersion) {
            postMessage({
                status: "no-change",
            });
            return;
        }

        const { data } = await apiFetch.narrators.get.query();
        const narrators = data.map((item) => ({
            id: Number(item.rawi_index),
            name: item.name,
            grade: item.grade,
            places: item.places,
            birth: item.birth,
            death: item.death,
            dateBirth: item.date_birth,
            dateDeath: item.date_death,
            fullName: item.full_name,
            gradeAr: item.grade_ar,
            gradeEn: item.grade_en,
        }));

        // Save to IndexedDB
        await clientDB.narrators.clear();
        // @ts-ignore
        await clientDB.narrators.bulkAdd(narrators);

        postMessage({
            status: "done",
            data: {
                narrators,
                version,
            },
        });
    } catch (error) {
        console.error("[Worker] Unexpected error:", error);
        postMessage({
            status: "field",
            error: error,
        });
    }
};
self.onmessage = onMessage;
