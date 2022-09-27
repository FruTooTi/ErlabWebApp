////(function () {
////    this.SubCategory = {};
////    this.SubCategory = function (name) {
////        this.subCategoryRow = document.createElement('div');
////        this.rowTitle = document.createElement('div'); // Sonradan Ekleme
////        this.backButton = document.createElement('div'); // Sonradan Ekleme
////        this.nextButton = document.createElement('div'); // Sonradan Ekleme

////        this.subCategoryRow.id = name;
////        this.subCategoryRow.section = 1; // Sonradan Eklendi
////        this.subCategoryRow.className += "subCategoryRow";
////        this.backButton.className += "back"; // Sonradan Ekleme
////        this.nextButton.className += "next"; // Sonradan Ekleme
////        this.rowTitle.className += "rowTitle";

////        this.rowTitle.innerHTML = name;

////        this.backButton.addEventListener('click', function (e) { // Sonradan Eklendi
////            App.Display.Show.PrevSection(e.target);
////        })
////        this.nextButton.addEventListener('click', function (e) { // Sonradan Eklendi
////            App.Display.Show.NextSection(e.target);
////        })

////        this.subCategoryRow.appendChild(this.backButton); // Sonradan Eklendi
////        this.subCategoryRow.appendChild(this.nextButton); // Sonradan Eklendi
////        this.subCategoryRow.appendChild(this.rowTitle);

////        return this.subCategoryRow;
////    }
////}).apply(App);

(function () {
    this.SubCategory = {};
    this.SubCategory = function (model) {
        model.parent.insertAdjacentHTML("beforeend", `<div id=${model.name} class="subCategoryRow">
        <div class="back"></div>
        <div class="next"></div>
        <div class="rowTitle">${model.name}</div>
        </div>`);
        var element = document.querySelector(`div[id=${model.name}]`);
        var back = element.getElementsByClassName('back')[0];
        var next = element.getElementsByClassName('next')[0];
        element.section = 1;
        back.addEventListener("click", function (e) {
            App.Display.Show.PrevSection(e.target);
        });
        next.addEventListener("click", function (e) {
            App.Display.Show.NextSection(e.target);
        });
        return element;
    }
}).apply(App);