/* Dom */
import { openModal, closeModal } from './js/dom';
const triggerBtn = document.querySelector('.trigger-sync');
const exitBtn = document.querySelector('.form__exit');

/* Algolia */ 
import { searchBox, hits, configure, refinementList, clearRefinements, pagination } from 'instantsearch.js/es/widgets';
import { search } from './js/algoliaSearch';

/* Add recipe */
import { onFormSubmit } from './js/addRecipe';
const formSubmitBtn = document.querySelector('.form__submit');

/* Event listeners */
triggerBtn.addEventListener('click', openModal);
exitBtn.addEventListener('click', closeModal);
formSubmitBtn.addEventListener('click', onFormSubmit);


/* Widgets */
search.addWidgets([
    configure({
      hitsPerPage: 10
    }),

    searchBox({
      container: '.search-box',
      cssClasses : {
        root: 'jl-search-box',
        input: [
            'jl-search-box-input'
        ]
      }
    }),
  
    hits({
      container: '.hits',
      cssClasses: {
        list: ["recipes-list"],
        item: "recipe"
      },
      templates: {
        item(hit, { html, components, sendEvent}) {
            return html`
            <a href="${hit.url}" target="_blank" onClick=${() => sendEvent('click', hit, 'Result clicked')}>
            <article>
            
              <div class="card__header" style="background-image: url(${hit.image});"}>

              </div>
              <div class="card__body">
              <h3 class="card__title">
                ${components.Highlight({ attribute: 'title', hit})}
              </h3>  
              <div class="card__time"><span class="card__icon">⏰</span>${hit.time}</div>
                <div class="card__ingredients">
                  ${components.Highlight({ attribute: 'primaryIngredients', hit})}
                </div>

              </div>


            </article>
            </a>
            `
        }
      }
    }),

    refinementList({
        container: '.filter--cuisine',  
        attribute: 'cuisine',
        operator: 'and',
        cssClasses: {
            list: "jl-refinement-list",
            labelText: "jl-refinement-text",
            checkbox: "jl-refinement-checkbox"
        },
      }),

      refinementList({
        container: '.filter--carb',
        attribute: 'mainCarb',
        operator: 'and',
        cssClasses: {
            list: "jl-refinement-list",
            labelText: "jl-refinement-text",
            checkbox: "jl-refinement-checkbox"
        },
        transformItems(items) {
          return items.map(item => ({
            ...item,
            highlighted: item.highlighted.toLowerCase(),
          }));
        },

      }),

      refinementList({
        container: '.filter--ingredients',
        attribute: 'primaryIngredients',
        operator: 'and',
        searchable: true,
        showMore: true,
        transformItems(items) {
          return items.map(item => ({
            ...item,
            highlighted: item.highlighted.toLowerCase(),
          }));
        },
        cssClasses: {
            list: "jl-refinement-list",
            checkbox: "jl-refinement-checkbox",
            labelText: "jl-refinement-text",
            showMore: "jl-show-more",
            disabledShowMore: "jl-disabled-show-more"
        },
      }),

      refinementList({
        container: '.filter--time',
        operator: 'and',
        attribute: 'time',
        transformItems(items) {
          return items.map(item => ({
            ...item,
            highlighted: item.highlighted.toLowerCase(),
          }));
        },
        cssClasses: {
            list: "jl-refinement-list",
            labelText: "jl-refinement-text",
            checkbox: "jl-refinement-checkbox"
        },
      }),

      clearRefinements({
          container: ".clear-filters",
          cssClasses : {
            button: ['jl-clear-filters'],
            labelText: "jl-refinement-text",
            disabledButton: 'jl-clear-filters-disabled'
          }
          
      }),

      pagination({
        container: '.pagination',
        cssClasses: {
            root: "jl-pagination"
        }
      }),

  ]);

search.start();

