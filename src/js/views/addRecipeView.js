import View from './View.js';

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded'

    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor() {
        super()
        this._addHandlerShowWindow();
        this._addHandlerHideWindow()
    }

    _toggleWindow() {
        this._overlay.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this._toggleWindow.bind(this))
    }

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this._toggleWindow.bind(this))
        this._overlay.addEventListener('click', this._toggleWindow.bind(this))
    }

    addHandlerUpload(controlAddRecipe) {
        this._parentElement.addEventListener("submit", (e) => {
            e.preventDefault();
            const dataArr = [...new FormData(this._parentElement)];
            const data = Object.fromEntries(dataArr)
            controlAddRecipe(data);
        })
    }

    _generateMarkup() { }

}

export default new AddRecipeView();