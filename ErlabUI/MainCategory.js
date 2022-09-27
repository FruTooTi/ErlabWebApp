////(function () {
////    this.MainCategory = {};
////    this.MainCategory = function (name) {
////        this.mainCategoryElement = document.createElement('div');
////        this.mainCategoryElement.innerHTML = name;
////        this.mainCategoryElement.id = name;
////        this.mainCategoryElement.className += "mainCategoryElement";
////        this.mainCategoryElement.addEventListener('click', function (e) {
////            App.ModelManager.GetMainCategoryModels("getAllMainCategories", e.target.id);
////            App.ModelManager.GetSubCategoryModels("getAllSubCategories", e.target.id);
////        })

////        return this.mainCategoryElement;
////    }
////}).apply(App);

(function () {
    this.MainCategory = {};
    this.MainCategory = function (model) {
        model.parent.insertAdjacentHTML("beforeend", `<div class="mainCategoryElement" id=${model.name}>${model.name}</div>`);
        var element = document.getElementById(`${model.name}`);
        element.addEventListener("click", function (e) {
            App.ModelManager.GetMainCategoryModels("getAllMainCategories", e.target.id);
            App.ModelManager.GetSubCategoryModels("getAllSubCategories", e.target.id);
        })
        return element;
    }
}).apply(App);