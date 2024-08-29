class SearchView {
    _parentElement = document.querySelector('.search')
    // _searchBtnEl = document.querySelector('.search__btn')

    getQuery() {
        return this._parentElement.querySelector('.search__field').value;
    }

    clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    }

    addHandlerRender(controlSearchResults) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault()
            controlSearchResults();
        });
    }


}
export default new SearchView()