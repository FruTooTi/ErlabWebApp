(function () {
    this.FetchData = {};
    this.FetchData.getData = function getData(queryString, options) {
        var xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(xhttp.response);
                options.success(response);
            }
            else if (this.readyState == 4) {
                console.log("Failed to fetch required data.");
                options.failure();
            }
        }
        xhttp.open("GET", options.url + options.address + "/" + queryString);
        xhttp.send();
    }
}).apply(App);
