export type SearchResultSection = {
    title: string;
    results: SearchResult[];
}

export type SearchResult = {
    title: string;
    description: string;
    href: string;
}