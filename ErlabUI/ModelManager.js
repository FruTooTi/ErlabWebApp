(function () {
    var apiURL = "https://localhost:7281";
    this.ModelManager = {};
    this.ModelManager.GetMainCategoryModels = function GetMainCategoryModels(command, mainCategory = "Vitrin") {
        var cacheValue = App.Cache.Get(command);
        if (cacheValue != null) {
            App.Display.Show.MainCategories(cacheValue, mainCategory);
        }
        else {
            App.FetchData.getData(command, {
                url: apiURL,
                address: "/api/Movie",
                success: function (result) {
                    App.Cache.Set(command, result);
                    App.Display.Show.MainCategories(result, mainCategory);
                },
                failure: function () {
                    console.log("Failed to fetch data.");
                    return null;
                }
            });
        }
    }
    this.ModelManager.GetSubCategoryModels = function GetSubCategoryModels(command, mainCategory = "Vitrin") {
        var queryString = command + "/" + mainCategory;
        var cacheValue = App.Cache.Get(queryString);
        if (cacheValue != null) {
            App.Display.Show.SubCategories(cacheValue, mainCategory);
        }
        else {
            App.FetchData.getData(queryString, {
                url: apiURL,
                address: "/api/Movie",
                success: function (result) {
                    App.Cache.Set(queryString, result);
                    App.Display.Show.SubCategories(result, mainCategory);
                },
                failure: function () {
                    console.log("Failed to fetch data.");
                    return null;
                }
            });
        }
    }
    this.ModelManager.GetMovieModelsByCategoryPath = function GetMovieModelsByCategoryPath(mainCategory, subCategory) {
        var queryString = mainCategory + "/" + subCategory;
        var cacheValue = App.Cache.Get(queryString);
        if (cacheValue != null) {
            App.Display.Show.MoviesByCategory(cacheValue, subCategory);
            App.Display.Show.CheckButtonVisibility(subCategory);
        }
        else {
            App.FetchData.getData(queryString, {
                url: apiURL,
                address: "/api/Movie",
                success: function (result) {
                    App.Cache.Set(queryString, result);
                    App.Display.Show.MoviesByCategory(result, subCategory);
                },
                failure: function () {
                    console.log("Failed to fetch data.");
                    return null;
                }
            });
        }
    }
    this.ModelManager.GetContentModelById = function GetContentModelById(id) {
        var cacheValue = App.Cache.Get(id);
        if (cacheValue != null) {
            App.Display.Show.ContentInfo(cacheValue);
        }
        else {
            App.FetchData.getData(id, {
                url: apiURL,
                address: "/api/Movie",
                success: function (result) {
                    App.Cache.Set(id, result);
                    App.Display.Show.ContentInfo(result);
                },
                failure: function () {
                    console.log("Failed to fetch data.");
                    return null;
                }
            });
        }
    }
}).apply(App);