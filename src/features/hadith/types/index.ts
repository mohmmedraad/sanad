export interface HadithData {
    hadith: string;
    rawi: string;
    mohdith: string;
    book: string;
    numberOrPage: string;
    grade: string;
}

export interface GetHadithApiResponse {
    data: HadithData[];
    length: number;
    page: number;
}

export interface HadithApi {
    getHadith(search: string, page: number): Promise<GetHadithApiResponse>;
}
