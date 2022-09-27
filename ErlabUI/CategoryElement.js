////(function () {
////    this.CategoryElement = {};
////    this.CategoryElement = function (properties, contentNumber) {
////        this.categoryElement = document.createElement('div');
////        this.imagePanel = document.createElement('img');
////        this.title = document.createElement('div');

////        this.categoryElement.className += "categoryElement";
////        this.imagePanel.className += "imagePanel";
////        this.title.className += "title";

////        this.categoryElement.contentId = properties.id;
////        this.imagePanel.src = properties.poster;
////        this.imagePanel.contentId = properties.id;
////        this.title.innerHTML = properties.title;
////        this.title.contentId = properties.id;

////        this.categoryElement.appendChild(this.imagePanel);
////        this.categoryElement.appendChild(this.title);

////        this.categoryElement.addEventListener('click', function (e) {
////            var contentId = e.target.contentId;
////            App.ModelManager.GetContentModelById(contentId);
////        });
////        this.categoryElement.value = contentNumber;

////        return this.categoryElement;
////    }
////}).apply(App);

(function () {
    this.CategoryElement = {};
    this.CategoryElement = function (model) {
        model.parent.insertAdjacentHTML("beforeend", `<div class="categoryElement" contentId="${model.id}" value=${model.contentNumber}><img class="imagePanel" src=${model.poster} contentId="${model.id}"/><div class="title">${model.title}</div></div>`);
        var element = document.querySelector(`#${model.parent.id} div[contentId = "${model.id}"]`);
        element.addEventListener('click', function (e) {
            var contentId = e.target.getAttribute('contentId');
            App.ModelManager.GetContentModelById(contentId);
        });
        return element;
    }
}).apply(App);