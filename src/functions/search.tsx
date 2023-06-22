const FlexSearch = require('flexsearch');

import { Fragment } from 'react';
import {
  TSearchIndexData,
  TSearchMetadata,
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
      store: ['title', 'url']
    },
    context: {
      resolution: 9,
      depth: 2,
      bidirectional: true
    }
  });

  // This indexes a certain section of a page by its content and stores multiple values about it.
  const sectionIndex = new FlexSearch.Document({
    cache: 100,
    tokenize: 'full',
    document: {
      id: 'id',
      index: 'content',
      tag: 'pageId',
      store: ['title', 'content', 'url', 'display']
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
      // console.log('search result content: ', content, 'title: ', title);

      sectionIndex.add({
        id: url,
        url,
        title,
        pageId: `page_${pageId}`,
        content: title,
        display: content
      });

      sectionIndex.add({
        id: `${url}_content`,
        url,
        title,
        pageId: `page_${pageId}`,
        content,
        text
      });

      pageContent += ` ${title} ${content}`;
    }

    // Add the page to the page index.
    pageIndex.add({
      id: pageId,
      url: path,
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

  const searchResults: Array<TSearchResultSection & TSearchMetadata> = [];
  const pageTitleMatches: Record<number, number> = {};
  let offsetIdx = 0;
  //! Current issue: If the query matches a subtitle of a page or the page title itself, the page result is empty because pageContent doesnt contain those texts.
  for (let i = 0; i < pageResults.length; i++) {
    pageTitleMatches[i] = 0;
    const pageResult = pageResults[i];
    const searchResultItems: Array<TSearchResult> = [];

    // Search for hits in the sections of the page.
    const sectionResults =
      sectionIndex.search(query, 5, {
        offset: offsetIdx++ * 5, // Without it, limit seems to be applied before the tag filter is applied.
        // limit: 5,
        enrich: true,
        suggest: true,
        tag: `page_${pageResult.id}`
      })[0]?.result ?? [];

    console.log('search section results: ', sectionResults);

    const occured: Record<string, boolean> = {};
    for (let j = 0; j < sectionResults.length; j++) {
      const sectionResult = sectionResults[j];
      if (sectionResult.doc.display !== undefined) {
        pageTitleMatches[i]++;
      }

      const key =
        sectionResult.doc.url +
        '@' +
        (sectionResult.doc.display ?? sectionResult.doc.content);

      if (occured[key]) {
        continue;
      }
      occured[key] = true;

      searchResultItems.push({
        title: sectionResult.doc.title,
        description: sectionResult.doc.content ?? sectionResult.doc.title,
        href: sectionResult.doc.url
      });
    }

    console.log('section results', sectionResults);
    // if (sectionResults.length === 0) continue;

    // Add the result section to the search results.
    searchResults.push({
      _page_matches: pageTitleMatches[i],
      _section_matches: sectionResults.length,
      title: pageResult.doc.title,
      results: searchResultItems
    });
  }
  //TODO: Return this directly after testing.
  const res = searchResults.sort((a, b) => {
    const aPageMatches = pageTitleMatches[a._page_matches];
    const bPageMatches = pageTitleMatches[b._page_matches];
    if (
      pageTitleMatches[a._page_matches] === pageTitleMatches[b._page_matches]
    ) {
      if (a._section_matches === b._section_matches) return 0;
      return b._section_matches - a._section_matches;
    }
    return bPageMatches - aPageMatches;
  });
  console.log('search results', res);
  return res;
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

    console.log('last occ: ', occ);
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
