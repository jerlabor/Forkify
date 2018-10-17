import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements,renderLoader,clearLoader} from './views/base';

const state = {}


const controlSearch = async () => {

    // const query = searchView.getInput();
    const query = 'pizza';

    if(query) {
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            await state.search.getResults();
            clearLoader();                                                                                                                                               // console.log(state.search.result);
            searchView.renderResults(state.search.result);
        }catch(error){
            console.log(error);
            clearLoader();  
        }
        
    }
};

// elements.searchForm.addEventListener('submit', e => {
//     e.preventDefault();
//     controlSearch();

// });

window.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();

});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
    }

    
});



/*   RECIPE CONTROLLER */

const controlRecipe = async () => {
    const id = window.location.hash.replace('#','');

    if(id){

        state.recipe = new Recipe(id);
        window.r = state.recipe;
        try{
            await state.recipe.getRecipe();
            state.recipe.calcTime();
            state.recipe.calcServings();

            console.log(state.recipe);
        }catch(error){
            console.log(error);
        }
        
    }
}

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));