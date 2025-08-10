import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export class NarratorsService {
    getNarrators() {
        const narrators = this.getHadithNarrators();
        return narrators.data;
    }

    getNarratorsVersion() {
        const narrators = this.getHadithNarrators();
        return narrators.version;
    }

    getHadithNarrators() {
        const NARRATORS_DIRECTORY = "src/data";
        const narratorsDir = resolve(process.cwd(), NARRATORS_DIRECTORY);
        const narrators = existsSync(narratorsDir)
            ? readFileSync(`${narratorsDir}/narrators.json`, "utf-8")
            : "[]";

        return JSON.parse(narrators as string) as {
            version: string;
            data: {
                rawi_index: string;
                name: string;
                grade: string;
                places: string;
                birth: string;
                death: string;
                date_birth: string;
                date_death: string;
                full_name: string;
                grade_ar: string;
                grade_en: string;
            }[];
        };
    }
}
