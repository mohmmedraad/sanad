"use client";

import type { NarratorsSyncWorkerReturn } from "@/types";
import { useEffect } from "react";

const DataSyncWorker = () =>
    new Worker(
        new URL(
            "../../../workers/narrators-data-sync.worker.js",
            import.meta.url,
        ),
    );

export default function SyncNarrators() {
    useEffect(() => {
        if (window === undefined) {
            return;
        }

        const worker = DataSyncWorker();

        const localNarratorsVersion =
            localStorage.getItem("data-version") || "0";
        worker.postMessage({ localNarratorsVersion });

        worker.onmessage = async (event: {
            data: NarratorsSyncWorkerReturn;
        }) => {
            const { status, data, error } = event.data;

            if (status === "done" && data) {
                console.log("[Main] Data updated");
                localStorage.setItem("data-version", data.version.toString());
            } else if (status === "no-change") {
                console.log("[Main] No update needed.");
            } else if (status === "field") {
                console.error("[Main] Worker Error:", error);
            }

            worker.terminate();
        };
    }, []);

    return null;
}
