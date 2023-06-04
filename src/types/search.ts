/**
 * A single search result section.
 */
export type TSearchResultSection = {
    title: string;
    results: TSearchResult[];
};

/**
 * A single search result.
 */
export type TSearchResult = {
    title: string;
    description: string;
    href: string;
};

/**
 * The search index data.
 */
export type TSearchIndexData = {
    [key: string]: TSearchIndexDataEntry
}
/**
 * A single entry in the search index.
 */
export type TSearchIndexDataEntry = {
    title: string,
    data: {
        [key: string]: string
    }
}