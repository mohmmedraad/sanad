import { APIException } from "@/lib/api-exception";
import type { GetHadithApiResponse, HadithApi } from "../types";

export class HadithService {
    constructor(private readonly hadithApi: HadithApi) {}

    async getHadith({
        search = "",
        page = 1,
    }: {
        search?: string;
        page?: number;
    }): Promise<GetHadithApiResponse> {
        const result = await this.hadithApi.getHadith(search, page);

        if (result.data.length === 0) {
            throw new APIException("BAD_GATEWAY", {
                message: "No hadith found in the response",
            });
        }

        return result;
    }
}
