var App = App || {};

(function () {
    this.Init = function Init(settings) {
        settings.MainCategories(settings.queryStrings.mainCategoryQuery);
        settings.SubCategories(settings.queryStrings.subCategoryQuery.command, settings.queryStrings.subCategoryQuery.value);
    }

    window.onload = function (event) {
        App.Configuration.ConfigureDocumentEventListeners();
        App.Init({
            MainCategories: App.ModelManager.GetMainCategoryModels,
            SubCategories: App.ModelManager.GetSubCategoryModels,
            queryStrings: {
                mainCategoryQuery: "getAllMainCategories",
                subCategoryQuery: {
                    command: "getAllSubCategories",
                    value: "Vitrin"
                }
            }
        });
    }
}).apply(App);