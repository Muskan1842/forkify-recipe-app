import icons from 'url:../../img/icons.svg'
import previewView from './previewView';
import View from './View';


class BookmarksView extends View {

    _parentElement = document.querySelector('.bookmarks__list')
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)'
    _message = '';


    addHandlerRender(handler) {
        window.addEventListener('load', handler)
    }
    _generateMarkup() {
        console.log(this._data)
        const IsUserGenerated = true;
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('')
        // return this._data.reduce((acc, recipeItem) => {
        //     const id = window.location.hash.slice(1)

        //     const userGeneratedMarkup = `
        //             <div class="preview__user-generated">
        //                 <svg>
        //                     <use href="${icons}#icon-user"></use>
        //                 </svg>
        //             </div>`

        //     const markup = `
        //             <li class="preview">
        //                 <a class="preview__link ${recipeItem.id === id ? 'preview__link--active' : ''}" href="#${recipeItem.id}">
        //                 <figure class="preview__fig">
        //                     <img src="${recipeItem.image}" alt="${recipeItem.title}" />
        //                 </figure>
        //                 <div class="preview__data">
        //                     <h4 class="preview__title">${recipeItem.title}</h4>
        //                     <p class="preview__publisher">${recipeItem.publisher}</p>
        //                     ${IsUserGenerated ? userGeneratedMarkup : ''}
        //                 </div>
        //                 </a>
        //             </li>
        //             `
        //     return acc + markup;
        // }, '')

        // this._parentElement.innerHTML = '';
        // this._parentElement.insertAdjacentHTML('afterbegin', finalSearchResults)

    }

}

export default new BookmarksView();