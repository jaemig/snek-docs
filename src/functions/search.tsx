const FlexSearch = require('flexsearch');

import { Fragment } from 'react';
import {
  TSearchIndexData,
  TSearchResult,
  TSearchResultSection
} from '../types/search';
import { Text } from '@chakra-ui/react';

/**
 * Searches the docs for the given query.
 * @param query  The query to search for
 * @returns  The search results
 */
export async function searchDocs(
  query: string
): Promise<TSearchResultSection[]> {
  const data = await retrieveSearchData();

  // This indexes a whole page by its content and stores the title.
  const pageIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      store: ['title']
    }
  });

  // This indexes a certain section of a page by its content and stores multiple values about it.
  const sectionIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: ['content'],
      tag: 'pageId',
      store: ['title', 'content', 'url']
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true
    }
  });

  let pageId = 0;
  for (const [path, item] of Object.entries(data)) {
    let pageContent = ''; // This will be the content of the whole page.

    for (const heading of Object.keys(item.data)) {
      const [anchor, title] = heading.split('#');
      const url = `${path}#${anchor}`;

      const text = item.data[heading];

      const content = text ?? title;

      sectionIndex.add({
        id: url,
        url,
        title,
        pageId: `page_${pageId}`,
        content,
        text
      });

      pageContent += content;
    }

    // Add the page to the page index.
    pageIndex.add({
      id: pageId,
      title: item.title,
      content: pageContent
    });
    pageId++;
  }

  // Search for hits in the whole pages.
  const pageResults =
    pageIndex.search(query, {
      limit: 5,
      enrich: true,
      suggest: true
    })[0]?.result ?? [];

  const searchResults: TSearchResultSection[] = [];
  let i = 0;
  for (const pageResult of pageResults) {
    const searchResultItems: TSearchResult[] = [];
    // Search for hits in the sections of the page.
    const sectionResults =
      sectionIndex.search(query, {
        offset: i++ * 5, // Without it, limit seems to be applied before the tag filter is applied.
        limit: 5,
        enrich: true,
        suggest: true,
        tag: `page_${pageResult.id}`
      })[0]?.result ?? [];

    for (const sectionResult of sectionResults) {
      searchResultItems.push({
        title: sectionResult.doc.title,
        description: sectionResult.doc.content ?? sectionResult.doc.title,
        href: sectionResult.doc.url
      });
    }

    // If there are no section results, add the page itself.
    if (searchResultItems.length === 0) {
      searchResultItems.push({
        title: pageResult.doc.title,
        description: pageResult.doc.title,
        href: pageResult.doc.url
      });
    }

    // Add the result section to the search results.
    searchResults.push({
      title: pageResult.doc.title,
      results: searchResultItems
    });
  }
  return searchResults;
}

/**
 *  Retrieves the search index data from the server.
 * @returns The search index data
 */
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
}

/**
 * Highlight all occurences the search query in the text
 * @param text  The text to highlight
 * @param query  The search query
 * @param charLimit  The maximum number of characters to show before and after the first occurrence. Use 0 to show the whole text.
 * @returns  The text with highlighted query
 */
export function highLightQuery(text: string, query: string, charLimit = 100) {
  let lowercase_text = text.toLowerCase();
  const lowercase_query = query.toLowerCase();
  let searchIdx = 0; // The index of the last search
  let occ; // The index of the current occurrence
  const textParts = [];

  while ((occ = lowercase_text.indexOf(lowercase_query, searchIdx)) !== -1) {
    if (searchIdx === 0 && charLimit > 0) {
      // Trim the whole text to the charLimit around the first occurrence
      let startIdx = Math.max(0, occ - charLimit);
      if (startIdx > 0 && text[startIdx] != ' ') {
        // If the start index is not at the beginning of a word, move it to the next space in case it is not too far away
        const spaceIdx = text.indexOf(' ', startIdx);
        if (spaceIdx < startIdx + charLimit * 0.2) startIdx = spaceIdx;
      }
      let endIdx = Math.min(text.length, occ + charLimit);
      if (endIdx < text.length && text[endIdx] != ' ') {
        // If the end index is not at the end of a word, move it to the previous space in case it is not too far away
        const spaceIdx = text.lastIndexOf(' ', endIdx);
        if (spaceIdx > endIdx - charLimit * 0.2) endIdx = spaceIdx;
      }
      const suffix = endIdx != text.length ? '...' : '';
      lowercase_text = lowercase_text.substring(startIdx, endIdx);
      text = text.substring(startIdx, endIdx) + suffix;
      occ -= startIdx;
    }

    const prefix = text.substring(searchIdx, occ);
    searchIdx = occ + query.length;
    textParts.push(
      <Fragment key={occ}>
        {prefix}
        <Text as="span" color="theme.600">
          {text.substring(occ, occ + query.length)}
        </Text>
      </Fragment>
    );
  }
  // Add the last part of the text
  if (searchIdx < text.length) {
    textParts.push(
      <Fragment key={text.length}>
        {text.substring(searchIdx, text.length)}
      </Fragment>
    );
  }
  return textParts.length > 0 ? <>{textParts} </> : text;
}
