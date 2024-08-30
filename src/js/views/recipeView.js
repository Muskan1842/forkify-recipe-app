
import icons from 'url:../../img/icons.svg'
import View from './View.js';
import Fraction from 'fraction.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!'
  _message = ''


  addHandlerRender(controlRecipes) {
    const eventsArray = ['hashchange', 'load']
    eventsArray.forEach(element => window.addEventListener(element, controlRecipes));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {

      const btn = e.target.closest('.btn--update-servings');

      if (!btn) return;

      const updateTo = +btn.dataset.updateTo

      if (updateTo > 0) handler(updateTo);

    })

  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn--bookmark');

      if (!btn) return;

      //call handler
      handler()

    })
  }

  _generateMarkup() {
    const generateMarkupIngredients = this._data.ingredients.reduce((finalString, item) => {
      const htmlStringIngredients =
        `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${item.quantity ? new Fraction(item.quantity).toString() : ''}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${item.unit}</span>
              ${item.description}
            </div>
          </li>
        `
      return finalString + htmlStringIngredients;
    }, '')


    return `
            <figure class="recipe__fig">
              <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${this._data.title}</span>
              </h1>
            </figure>
            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${icons}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                <span class="recipe__info-text">servings</span>
    
                <div class="recipe__info-buttons">
                  <button data-update-to = "${this._data.servings - 1}" class="btn--tiny btn--update-servings">
                    <svg>
                      <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button data-update-to = "${this._data.servings + 1}" class="btn--tiny btn--update-servings">
                    <svg>
                      <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>
    
              <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
              <button class="btn--round btn--bookmark">
                <svg class="">
                  <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
                </svg>
              </button>
            </div>
    
            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
            ${generateMarkupIngredients}
              </ul>
            </div>
    
            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${this._data.sourceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
          `
  }

}

export default new RecipeView();