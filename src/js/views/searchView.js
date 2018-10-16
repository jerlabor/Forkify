import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
}
const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend',markup);
};

const limitRecipeTitle = (title, limit = 17) => {
    const newIitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc,cur) => {
            if(acc + cur.length <= 17){
                newIitle.push(cur);
            }

            return acc + cur.length;
        },0)

        return `${newIitle.join(' ')} ...`;
    }

    return title;
}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};