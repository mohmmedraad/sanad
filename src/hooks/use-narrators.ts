import { clientDB } from "@/client-db";
import { useLiveQuery } from "dexie-react-hooks";

export const useNarratorsLiveQuery = () => {
    const narrators = useLiveQuery(() => clientDB.narrators.toArray());

    return narrators;
};

export const useNarratorLiveQuery = (id: number) => {
    const narrator = useLiveQuery(() => clientDB.narrators.get(id));

    return narrator;
};
