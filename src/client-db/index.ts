// db.ts
import Dexie from "dexie";
import { type NarratorsTableEntity, narratorsTable } from "./schema";

const clientDB = new Dexie("sanad-db") as Dexie & {
    narrators: NarratorsTableEntity;
};

clientDB.version(2).stores({
    narrators: narratorsTable.columns,
});

export { clientDB };
