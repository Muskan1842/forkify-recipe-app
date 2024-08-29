import icons from 'url:../../img/icons.svg'
import View from './View.js';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination')

    addHandlerclick(handler) {

        this._parentElement.addEventListener('click', function (e) {

            const btn = e?.target?.closest(".btn--inline");

            if (!btn) return;

            const goToPage = +btn.dataset.goto

            handler(goToPage);
        })

    }

    _generateMarkup() {
        // query: '',
        // results: [],
        // resultsPerPage: CONFIG.RES_PER_PAGE,
        // page: 1

        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        const currentPage = this._data.page;

        //page 1, and there are other pages
        if (currentPage === 1 && numPages > 1) {
            return this._generateMarkupButtonNext(currentPage)
        }

        // last page
        if (currentPage === numPages && numPages > 1) {
            return this._generateMarkupButtonPrev(currentPage)

        }

        // other page
        if (currentPage < numPages && currentPage > 1) {
            return this._generateMarkupButtonPrev(currentPage) + this._generateMarkupButtonNext(currentPage)

        }

        //page 1, no other pages
        //     if (currentPage === 1 && numPages == 1) {
        return ``
        //     }
    }



    _generateMarkupButtonPrev(currentPage) {
        return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        `
    }
    _generateMarkupButtonNext(currentPage) {
        return `
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`
    }


}

export default new PaginationView();