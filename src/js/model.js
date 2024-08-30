import * as CONFIG from './config.js'
import { getJSON, sendJSON } from './helper.js';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: CONFIG.RES_PER_PAGE,
        page: 1
    },
    bookmarks: []
}

const createRecipeObject = function (data) {
    const { recipe } = data.data;

    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key })

    }
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${CONFIG.API_URL}${id}?key=${CONFIG.API_KEY}`);
        state.recipe = createRecipeObject(data)

        if (state.bookmarks.some((bookrec) => state.recipe.id === bookrec.id))
            state.recipe.bookmarked = true;
        else
            state.recipe.bookmarked = false;

    } catch (err) {
        console.log(err)
    }
};

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${CONFIG.API_URL}?search=${query}&key=${CONFIG.API_KEY}`);
        const { recipes } = data?.data;

        state.search.results = recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && { key: recipe.key })
            }
        })

        state.search.page = 1;

    } catch (error) {
        console.log('Error')
        throw error;
    }
}

export const getSearchResultPage = function (page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = (page * state.search.resultsPerPage);

    return state.search.results.slice(start, end);
}

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    })
    state.recipe.servings = newServings;
}


export const addBookmark = function (recipe = state.recipe) {
    state.bookmarks.push(recipe);

    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }
    persistBookmarks()
}

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(bookrec => bookrec.id === id)
    state.bookmarks.splice(index, 1)

    if (id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }
    persistBookmarks()
}

const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

const clearBookmarks = function () {
    localStorage.clear('bookmarks')
}

const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage)
}

export const uploadRecipe = async function (newRecipe) {
    try {

        const ingredients = []

        Object.entries(newRecipe).map((item) => {
            if (item[0].includes('ingredient') && item[1] != "") {
                const tempIngArr = item[1].split(",")
                if (tempIngArr.length !== 3) throw new Error("Wtong Ingredient Format. Please use correct format.")

                ingredients.push({
                    quantity: tempIngArr[0] ? +tempIngArr[0] : null,
                    unit: tempIngArr[1],
                    description: tempIngArr[2]
                })
            }
        })

        const recipe = {
            cooking_time: +newRecipe.cookingTime,
            image_url: newRecipe.image ? newRecipe.image : "https://img.freepik.com/free-photo/flat-lay-mexican-food_23-2148140224.jpg",
            ingredients: ingredients,
            publisher: newRecipe.publisher,
            servings: +newRecipe.servings,
            source_url: newRecipe.sourceUrl,
            title: newRecipe.title,
        }

        const data = await sendJSON(`${CONFIG.API_URL}?key=${CONFIG.API_KEY}`, recipe)
        state.recipe = createRecipeObject(data)

        addBookmark(state.recipe)

    } catch (err) {
        throw err;
    }
}


init();


