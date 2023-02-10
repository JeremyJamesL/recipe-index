const algoliasearch = require('algoliasearch');
const client = algoliasearch('YSWWVAX5RB', process.env.API_KEY);
const index = client.initIndex('personalRecipes');


export const deleteRecipe = (e)  => {
    const yesDelete = window.confirm('are you sure you want to delete this recipe?');

    if(yesDelete) {
        const recipeID = e.target.nextElementSibling.nextElementSibling.href;
        index.deleteObject(recipeID).then(() => {
            window.alert('successfully deleted recipe');
            location.reload();
        });
    }

}   