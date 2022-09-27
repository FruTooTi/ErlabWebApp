(function () {
    this.Display = {};
}).apply(App);

(function () {
    this.Display.Clear = {};
    this.Display.Clear.MainCategories = function MainCategories() {
        var upper = document.getElementById('upper');
        while (upper.firstChild) {
            upper.removeChild(upper.lastChild);
        }
        var lower = document.getElementById('lower');
        while (lower.firstChild) {
            lower.removeChild(lower.lastChild);
        }
        var target = document.getElementById('target');
        while (target.firstChild) {
            target.removeChild(target.lastChild);
        }
    }

    this.Display.Clear.SubCategories = function SubCategories() {
        var subCategoryPanel = document.getElementById('subCategoriesMenu');
        while (subCategoryPanel.firstChild) {
            if (subCategoryPanel.lastChild.id != "Next" && subCategoryPanel.lastChild.id != "Back") // Sonradan Eklendi
                subCategoryPanel.removeChild(subCategoryPanel.lastChild);
            else // Sonradan Eklendi
                break;
        }
    }

    this.Display.Clear.InfoBase = function InfoBase() {
        var infoBase = document.getElementById('infoBase');
        var container = document.getElementById('main');
        while (infoBase.firstChild) {
            infoBase.removeChild(infoBase.lastChild);
        }
        if (infoBase.classList.contains("display-flex")) {
            infoBase.classList.remove("display-flex");
            infoBase.className += " display-none";
        }
        if (container.classList.contains('blur')) {
            container.classList.remove('blur');
        }
    }
}).apply(App);

(function () {
    this.Display.Show = {};
    this.Display.Show.MainCategories = function MainCategories(mainCategoryArray, id) {
        App.Display.Clear.MainCategories();
        var indexOfTarget = mainCategoryArray.indexOf(id);

        var target = document.getElementById('target');
        var upper = document.getElementById('upper');
        var lower = document.getElementById('lower');

        var targetChild = App.MainCategory(
            {
                name: mainCategoryArray[indexOfTarget],
                parent: target
            });
        // Üstte kalan kategorileri görüntüle

        for (var i = indexOfTarget - 1, iterator = 2; iterator > 0 && i >= 0; i--, iterator--) {
            var upperChild = App.MainCategory(
                {
                    name: mainCategoryArray[i],
                    parent: upper
                });
            if (iterator == 2) { // Sonradan Eklendi
                upperChild.style.opacity = 0.75;
            }
            else if (iterator == 1) { // Sonradan Eklendi
                upperChild.style.opacity = 0.5;
            }
        }
        // Altta kalan kategorileri görüntüle

        for (var i = indexOfTarget + 1, iterator = 0; iterator < 2 && i < mainCategoryArray.length; i++, iterator++) {
            var lowerChild = App.MainCategory(
                {
                    name: mainCategoryArray[i],
                    parent: lower
                });
            if (iterator == 0) { // Sonradan Eklendi
                lowerChild.style.opacity = 0.75;
            }
            else if (iterator == 1) { // Sonradan Eklendi
                lowerChild.style.opacity = 0.5;
            }
        }
    }

    this.Display.Show.SubCategories = function SubCategories(result, mainCategory) {
        App.Display.Clear.SubCategories();
        var subCategoryPanel = document.getElementById('subCategoriesMenu');
        for (index in result) {
            var newSubCategory = new App.SubCategory({
                name: result[index],
                parent: subCategoryPanel
            });
            App.ModelManager.GetMovieModelsByCategoryPath(mainCategory, result[index]);
        }
    }
    // Sonradan Eklenen fonksiyon
    this.Display.Show.MoviesByCategory = function MoviesByCategory(content, categoryId) {
        var contentCount = 0;
        var sectionCount = 0;
        var parentCategory = document.getElementById(categoryId);
        var section = null;
        for (index in content) {
            if (contentCount % 4 == 0) {
                sectionCount++;
                var newSection = new App.CategorySection({
                    parent: parentCategory,
                    id: sectionCount,
                    categoryName: categoryId
                });
                section = document.getElementById(categoryId + "Section" + sectionCount);
            }
            var newContent = new App.CategoryElement({
                parent: section,
                id: content[index].id,
                contentNumber: contentCount,
                poster: content[index].poster,
                title: content[index].title
            });
            contentCount++;
        }
        App.Display.Show.CheckButtonVisibility(parentCategory.id);
    }
    // Sonradan Eklendi
    this.Display.Show.NextSection = function NextSection(buttonPressed) {
        var parent = buttonPressed.parentNode;
        var category = parent.id;
        var currentSectionNumber = parent.section;
        var currentSection = document.getElementById(category + "Section" + currentSectionNumber);
        var nextSection = document.getElementById(category + "Section" + (currentSectionNumber + 1));
        if (nextSection != null) {
            currentSection.classList.remove("display-flex");
            currentSection.className += " display-none";

            currentSectionNumber++;
            parent.section = currentSectionNumber;

            var nextSection = document.getElementById(category + "Section" + currentSectionNumber)
            nextSection.classList.remove("display-none");
            nextSection.className += " display-flex";
            this.CheckButtonVisibility(parent.id);
        }
    }
    // Sonradan Eklendi
    this.Display.Show.PrevSection = function PrevSection(buttonPressed) {
        var parent = buttonPressed.parentNode;
        var category = parent.id;
        var currentSectionNumber = parent.section;
        if (currentSectionNumber != 1) {
            var currentSection = document.getElementById(category + "Section" + currentSectionNumber);
            currentSection.classList.remove("display-flex");
            currentSection.className += " display-none";

            currentSectionNumber--;
            parent.section = currentSectionNumber;

            var nextSection = document.getElementById(category + "Section" + currentSectionNumber);
            nextSection.classList.remove("display-none");
            nextSection.className += " display-flex";
            this.CheckButtonVisibility(parent.id);
        }
    }
    // Sonradan Eklendi
    this.Display.Show.CheckButtonVisibility = function CheckButtonVisibility(parentName) {
        var parentNode = document.getElementById(parentName);
        var backButton = parentNode.getElementsByClassName('back')[0];
        var currentSectionNumber = parentNode.section;
        if (currentSectionNumber == 1) {
            backButton.className += " display-none";
        }
        else if (currentSectionNumber != 1) {
            if (backButton.classList.contains('display-none')) {
                backButton.classList.remove('display-none')
            }
        }
        var nextButton = parentNode.getElementsByClassName('next')[0];
        var nextSectionNumber = currentSectionNumber + 1;
        var nextSection = document.getElementById(parentNode.id + "Section" + nextSectionNumber);
        if (nextSection == null) {
            nextButton.className += " display-none";
        }
        else if (nextSection != null) {
            if (nextButton.classList.contains('display-none')) {
                nextButton.classList.remove('display-none');
            }
        }
    }
    // Sonradan Eklendi
    this.Display.Show.ContentInfo = function ContentInfo(content) {
        App.Display.Clear.InfoBase();
        var infoBase = document.getElementById('infoBase');
        var info = new App.InfoPanel({
            data: content,
            parent: infoBase
        });
        var container = document.getElementById('main');

        container.className += " blur";

        if (infoBase.classList.contains('display-none')) {
            infoBase.classList.remove('display-none');
            infoBase.className += " display-flex";
        }
    }
}).apply(App);