////(function () {
////    this.CategorySection = {};
////    this.CategorySection = function (id, categoryName) {
////        this.section = document.createElement('div');
////        this.section.id = categoryName + "Section" + id;
////        this.section.className += "section";
////        if (id == 1)
////            this.section.className += " display-flex"; // Sonradan Ekleme
////        else
////            this.section.className += " display-none"; // Sonradan Ekleme

////        return this.section;
////    }
////}).apply(App);

(function () {
    this.CategorySection = {};
    this.CategorySection = function (model) {
        model.parent.insertAdjacentHTML("beforeend", `<div id="${model.categoryName}Section${model.id}" class="section"></div>`);
        var element = document.querySelector(`div[id=${model.categoryName}Section${model.id}]`);
        if (model.id == 1)
            element.className += " display-flex";
        else
            element.className += " display-none";
        return element;
    }
}).apply(App);