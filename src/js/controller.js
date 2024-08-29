import * as model from './model.js';
import addRecipeView from './views/addRecipeView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import searchResultsView from './views/searchResultsView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime'


if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

// /5ed6604591c37cdc054bc886?

///////////////////////////////////////

const controlRecipes = async function () {


  try {
    const id = window.location.hash.slice(1)
    // const id = window.location.pathname.slice(1)


    if (!id) return;

    //loading spinner
    recipeView.renderSpinner();

    //result view to mark selected search results
    searchResultsView.update(model.getSearchResultPage())
    bookmarksView.update(model.state.bookmarks)

    //loading recipe
    await model.loadRecipe(id);

    //redering recipe
    recipeView.render(model.state.recipe)

  } catch (error) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    console.log(query)
    if (!query) return;

    //loading spinner
    searchResultsView.renderSpinner();

    //loading search results
    await model.loadSearchResults(query)

    //rendering search results
    searchResultsView.render(model.getSearchResultPage())

    paginationView.render(model.state.search)

    searchView.clearInput()

  } catch (error) {
    throw error;
  }
}

const controlPagination = function (goToPage) {
  searchResultsView.render(model.getSearchResultPage(goToPage))
  paginationView.render(model.state.search)
}

const controlServings = function (newServings) {
  //Update recipe servings
  model.updateServings(newServings)
  //Update the recipe  View
  recipeView.update(model.state.recipe)
}

const controlAddBookmarks = function () {

  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe)

  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {

  try {
    await model.uploadRecipe(newRecipe);

    recipeView.render(model.state.recipe)

    addRecipeView.renderMessage()

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, "", `#${model.state.recipe.id}`)

    setTimeout(() => {
      addRecipeView._toggleWindow()
    }, 1500)

  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message)
  }
}

const init = function () {
  // model.init()
  // localStorage.clear('bookmarks')

  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmarks)
  searchView.addHandlerRender(controlSearchResults)
  paginationView.addHandlerclick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)

}

init()


