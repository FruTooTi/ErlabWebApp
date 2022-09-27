var App = App || {};
App.TemplateManager = {};

function MainCategoryComponent(data) {
    data.parent.innerHTML += `<div id=${data.id}>${data.html}</div>`;
}

var categoryData = [
    {
    id: "Vitrin",
    html: "Vitrin",
    parent: document.getElementById('appendMe'),
    type: "maincategory"
    },
    {
        id: "SecIzle",
        html: "SecIzle",
        parent: document.getElementById('appendMe'),
        type: "maincategory"
    },
    {
        id: "DiziIzle",
        html: "DiziIzle",
        parent: document.getElementById('appendMe'),
        type: "maincategory"
    }
];

(function () {
    this.Manager = function (data) {
        for (index in data) {
            if (data[index].type == "maincategory") {
                MainCategoryComponent(data[index]);
            }
        }
    };
}).apply(App.TemplateManager);

App.TemplateManager.Manager(categoryData);

