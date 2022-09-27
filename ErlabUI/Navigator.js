(function () {
    this.Navigator = {};

    var mode = 0;
    var contentNumber = 0;
    var currentContent = null;
    var sectionNumber = 0;
    var currentSection = null;
    var targetRowNumber = 0;
    var targetCategoryRow = null;

    this.Navigator.MainCategoryNav = function MainCategoryNav(e) {
        var upper = document.getElementById('upper');
        var lower = document.getElementById('lower');
        var target = document.getElementById('target');

        var upperMainCategoriesArray = Array.prototype.slice.call(upper.getElementsByClassName('mainCategoryElement')).reverse();
        var lowerMainCategoriesArray = Array.prototype.slice.call(lower.getElementsByClassName('mainCategoryElement'));
        var targetArray = Array.prototype.slice.call(target.getElementsByClassName('mainCategoryElement'));

        var mainCategoryArray = upperMainCategoriesArray.concat(targetArray, lowerMainCategoriesArray);
        var indexOfTarget = mainCategoryArray.indexOf(target.firstElementChild);
        if (mode == 0) {
            if (e.keyCode == 38 && indexOfTarget > 0) {
                App.ModelManager.GetMainCategoryModels("getallmaincategories", mainCategoryArray[indexOfTarget - 1].id);
                App.ModelManager.GetSubCategoryModels("getallsubcategories", mainCategoryArray[indexOfTarget - 1].id);
            }
            else if (e.keyCode == 40 && indexOfTarget < mainCategoryArray.length - 1) {
                App.ModelManager.GetMainCategoryModels("getallmaincategories", mainCategoryArray[indexOfTarget + 1].id);
                App.ModelManager.GetSubCategoryModels("getallsubcategories", mainCategoryArray[indexOfTarget + 1].id);
            }
            else if (e.keyCode == 39) {
                ChangeMode();
                if (target.classList.contains('targetColor')) {
                    target.classList.remove('targetColor');
                }
                App.Navigator.Run(e);
            }
        }
    }

    this.Navigator.SubCategoryNav = function SubCategoryNav(e) {
        var subCategories = Array.prototype.slice.call(document.getElementsByClassName('subCategoryRow'));
        if (targetCategoryRow == null) {
            targetCategoryRow = subCategories[0];
            currentSection = targetCategoryRow.getElementsByClassName('section')[sectionNumber];
            currentContent = currentSection.getElementsByClassName('categoryElement')[contentNumber];
            currentContent.className += " keytarget";
            targetCategoryRow.scrollIntoView();
        }
        else {
            if (mode == 1) {
                if (currentContent.classList.contains('keytarget'))
                    currentContent.classList.remove('keytarget');
                if (e.keyCode == 38) {
                    for (sectionNumber; sectionNumber > 0; sectionNumber--) {
                        App.Display.Show.PrevSection(targetCategoryRow.getElementsByClassName('back')[0]);
                    }
                    contentNumber = 0;
                    if (targetRowNumber > 0)
                        targetRowNumber--;
                    targetCategoryRow = subCategories[targetRowNumber];
                    targetCategoryRow.scrollIntoView();
                    var allElements = Array.prototype.slice.call(targetCategoryRow.getElementsByClassName('categoryElement'));
                    currentContent = allElements[contentNumber];
                    currentContent.className += " keytarget";
                }
                else if (e.keyCode == 40) {
                    for (sectionNumber; sectionNumber > 0; sectionNumber--) {
                        App.Display.Show.PrevSection(targetCategoryRow.getElementsByClassName('back')[0]);
                    }
                    contentNumber = 0;
                    if (targetRowNumber < subCategories.length - 1)
                        targetRowNumber++;
                    targetCategoryRow = subCategories[targetRowNumber];
                    targetCategoryRow.scrollIntoView();
                    var allElements = Array.prototype.slice.call(targetCategoryRow.getElementsByClassName('categoryElement'));
                    currentContent = allElements[contentNumber];
                    currentContent.className += " keytarget";
                }
                else if (e.keyCode == 39) {
                    var allElements = Array.prototype.slice.call(targetCategoryRow.getElementsByClassName('categoryElement'));
                    if (contentNumber < allElements.length - 1)
                        contentNumber++;
                    if (contentNumber % 4 == 0) {
                        sectionNumber++;
                        currentSection = targetCategoryRow.getElementsByClassName('section')[sectionNumber];
                        App.Display.Show.NextSection(targetCategoryRow.getElementsByClassName('next')[0]);
                    }
                    currentContent = allElements[contentNumber];
                    currentContent.className += " keytarget";
                }
                else if (e.keyCode == 37) {
                    var allElements = Array.prototype.slice.call(targetCategoryRow.getElementsByClassName('categoryElement'));
                    if (contentNumber == 0) {
                        ChangeMode();
                        contentNumber = 0;
                        currentContent = null;
                        sectionNumber = 0;
                        currentSection = null;
                        targetRowNumber = 0;
                        targetCategoryRow = null;
                        var target = document.getElementById('target');
                        target.className += " targetColor";
                    }
                    else {
                        if (contentNumber > 0)
                            contentNumber--;
                        if ((contentNumber + 1) % 4 == 0) {
                            sectionNumber--;
                            currentSection = targetCategoryRow.getElementsByClassName('section')[sectionNumber];
                            App.Display.Show.PrevSection(targetCategoryRow.getElementsByClassName('back')[0]);
                        }
                        currentContent = allElements[contentNumber];
                        currentContent.className += " keytarget";
                    }
                }
                else if (e.keyCode == 13) {
                    App.ModelManager.GetContentModelById(currentContent.getAttribute('contentId'));
                }
                else if (e.keyCode == 27) {
                    var infoPanel = document.getElementById('infoBase');
                    if (infoPanel.classList.contains('display-flex')) {
                        App.Display.Clear.InfoBase();
                    }
                }
            }
        }
    }

    ChangeMode = function ChangeMode() {
        if (mode == 1)
            mode = 0;
        else
            mode = 1;
    }

    this.Navigator.Run = function Run(mouseEvent) {
        if (mode == 0) {
            this.MainCategoryNav(mouseEvent);
        }
        else if (mode == 1) {
            this.SubCategoryNav(mouseEvent);
        }
    }
}).apply(App);