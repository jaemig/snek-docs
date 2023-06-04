import { TSearchIndexData, TSearchResultSection } from "../types/search";

export async function retrieveSearchData(): Promise<TSearchIndexData> {
    try {
        const res = await fetch('/search-index-alpha.json', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data: TSearchIndexData = await res.json();
        return data;
    } catch (err) {
        console.error('Could not retrieve search data.');
        return {};
    }
};