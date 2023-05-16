var FlexSearch = require("flexsearch");
/**
 *  Gets the search results from the server
 * @param searchTerm  The search term to search for
 */
const getSearchResults = (searchTerm: string) => {
    //TODO: Implement actual search results with data from the server
    const index = new FlexSearch.Document({
        optimize: true,
        document: {
            id: "id",
            
        }
    });
}