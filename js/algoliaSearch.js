import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';

const searchClient = algoliasearch(
    'YSWWVAX5RB', 
    '9fb3db0222f7b5aef0e2b30791ee6201',
  );
  
    
export const search = instantsearch({
      indexName: 'personalRecipes',
      searchClient,
      routing: {
      stateMapping: {
        stateToRoute: function (uiState) {
          return {
            q: uiState['personalRecipes'].query,
            pg: uiState['personalRecipes'].page
          };
        },
        routeToState: function (routeState) {
          return {
            personalRecipes: {
              query: routeState.q,
              page: routeState.pg
            },
          };
        },
      },
    },
  });