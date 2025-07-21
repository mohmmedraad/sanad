import { APIException } from "@/lib/api-exception";
import { fetchWithTimeout } from "@/lib/fetch-with-timeout";
import { decode } from "html-entities";
import { parseHTML } from "linkedom";
import type { GetHadithApiResponse, HadithApi, HadithData } from "../../types";

export class DorarHadithApi implements HadithApi {
    private apiUrl = "https://dorar.net/dorar_api.json";

    async getHadith(
        search: string,
        page: number,
    ): Promise<GetHadithApiResponse> {
        const url = new URL(this.apiUrl);
        url.searchParams.set("skey", search);
        url.searchParams.set("page", page.toString());

        try {
            const response = await fetchWithTimeout(url.toString());
            const data = await response.json();

            if (!data.ahadith?.result) {
                throw new APIException("BAD_GATEWAY", {
                    message: "Invalid response from Dorar API",
                });
            }

            const hadithData = this.parseHadithHtml(data.ahadith.result);

            return {
                data: hadithData,
                length: hadithData.length,
                page: page,
            };
        } catch (error) {
            if (error instanceof APIException) {
                throw error;
            }
            throw new APIException("BAD_GATEWAY", {
                message: "Failed to fetch hadith data",
            });
        }
    }

    private parseHadithHtml(html: string): HadithData[] {
        const decodedHtml = decode(html);
        const doc = parseHTML(decodedHtml).document;

        return Array.from(doc.querySelectorAll(".hadith-info"))
            .map((info) => this.parseHadithElement(info))
            .filter((hadith): hadith is HadithData => hadith !== null);
    }

    private parseHadithElement(info: Element): HadithData | null {
        try {
            const hadith = info.previousElementSibling?.textContent
                ?.replace(/\d+ -/g, "")
                .trim();

            if (!hadith) {
                return null;
            }

            const [rawi, mohdith, book, numberOrPage, grade] = [
                ...info.querySelectorAll(".info-subtitle"),
            ].map((el) => this.extractTextContent(el));

            return {
                hadith,
                // @ts-ignore
                rawi,
                // @ts-ignore
                mohdith,
                // @ts-ignore
                book,
                // @ts-ignore
                numberOrPage,
                // @ts-ignore
                grade,
            };
        } catch (error) {
            console.error("Error parsing hadith:", error);
            return null;
        }
    }

    private extractTextContent(element: Element): string {
        let nextEle = element.nextSibling;
        while (nextEle && nextEle.textContent?.trim().length === 0) {
            nextEle = nextEle.nextSibling;
        }
        return nextEle?.textContent?.trim() ?? "";
    }
}
