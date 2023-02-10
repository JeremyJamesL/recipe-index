const algoliasearch = require('algoliasearch');
const client = algoliasearch('YSWWVAX5RB', process.env.API_KEY);
const index = client.initIndex('personalRecipes');

export const onFormSubmit = (e) => {
    e.preventDefault();
    const form = document.querySelector('.form');
    const elements = form.elements;
    const ingredients = elements[2].value.toLowerCase().split(',');
    const objectToSend = [
        {
            "objectID": `${elements[4].value.toLowerCase()}`,
            "title": `${elements[0].value.toLowerCase()}`,
            "cuisine": `${elements[1].value.toLowerCase()}`,
            "primaryIngredients": ingredients,
            "mainCarb": `${elements[3].value.toLowerCase()}`,
            "url": `${elements[4].value}`,
            "image": `${elements[5].value}`,
            "time": `${elements[6].value.toLowerCase()}`
        }
    ]

    index.saveObjects(objectToSend).then(({ objectIDs }) => {
        window.alert(`You successfully added the recipe ${objectIDs}`)
    }).catch(error => {
        window.alert(`There was an error updating the recipes: ${error.message}`);
    });    
}