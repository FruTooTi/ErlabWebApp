////(function () {
////    this.InfoPanel = {};
////    this.InfoPanel = function (properties) {
////        this.infoPanel = document.createElement('div');
////        this.infoImg = document.createElement('div');
////        this.contentImg = document.createElement('img');
////        this.infoScrn = document.createElement('div');
////        this.contentTtl = document.createElement('div');
////        this.contentImdb = document.createElement('div');
////        this.contentDesc = document.createElement('div');

////        this.infoPanel.className += "info";
////        this.infoImg.className += "infoImg";
////        this.contentImg.className += "contentImg";
////        this.infoScrn.className += "infoScrn";
////        this.contentTtl.className += "contentTtl";
////        this.contentImdb.className += "contentImdb";
////        this.contentDesc.className += "contentDesc";

////        this.infoImg.id = "infoImage";
////        this.contentImg.id = "contentImage";
////        this.infoScrn.id = "infoScreen";
////        this.contentTtl.id = "contentTitle";
////        this.contentImdb.id = "contentImdbPoint";
////        this.contentDesc.id = "contentDescription";

////        this.contentImg.src = properties.poster;
////        this.contentTtl.innerHTML = properties.title;
////        this.contentImdb.innerHTML = "IMDb Rating: </br>" + properties.imDbRating;
////        this.contentDesc.innerHTML = properties.description;

////        this.infoImg.appendChild(this.contentImg);
////        this.infoScrn.appendChild(this.contentTtl);
////        this.infoScrn.appendChild(this.contentImdb);
////        this.infoScrn.appendChild(this.contentDesc);

////        this.infoPanel.appendChild(this.infoImg);
////        this.infoPanel.appendChild(this.infoScrn);

////        return this.infoPanel;
////    }
////}).apply(App);

(function () {
    this.InfoPanel = {};
    this.InfoPanel = function (model) {
        model.parent.insertAdjacentHTML("beforeend", `<div class="info">
        <div class="infoImg" id="infoImage">
            <img class="contentImg" id="contentImage" src="${model.data.poster}"/>
        </div>
        <div class="infoScrn" id="infoScreen">
            <div class="contentTtl" id="contentTitle">${model.data.title}</div>
            <div class="contentImdb" id="contentImdbPoint">IMDb Rating: </br>${model.data.imDbRating}</div>
            <div class="contentDesc" id="contentDescription">${model.data.description}</div>
        </div>
    </div>`);
    }
}).apply(App);