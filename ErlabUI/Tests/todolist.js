var ServiceCount = 0;
var ListNumber = 0;
var ListCount = 0;
class ListService {
    constructor() {
        if (ServiceCount > 0)
            throw new Error("You can only create one instance of 'ListService'");
        ServiceCount++;
    }

    addValue() {
        var list = document.getElementById('todoList' + ListNumber.toString());

        var text = document.getElementById('elementInput' + ListNumber.toString()).value;
        var element = document.createElement('li');
        element.innerHTML = text;

        list.appendChild(element);
    }

    newTitle() {
        var title = document.getElementById('titleInput' + ListNumber.toString()).value;

        var element = document.getElementById('mainTitle' + ListNumber.toString());
        element.innerHTML = title;

        document.getElementById('titleInput1').style.display = "none";
        document.getElementById('titleButton1').style.display = "none";

        document.getElementById('elementInput1').style.display = "block";
        document.getElementById('inputButton1').style.display = "block";
    }

    addButtonFunctionality(listNumber) {
        var inputButton = document.getElementById('inputButton' + listNumber.toString());
        inputButton.addEventListener("click", function () {
            ListNumber = listNumber;
            Service.addValue();
        });

        var titleButton = document.getElementById('titleButton' + listNumber.toString());
        titleButton.addEventListener("click", function () {
            ListNumber = listNumber;
            Service.newTitle();
        });

        var addListButton = document.getElementById('addListButton' + listNumber.toString());
        addListButton.addEventListener("click", function () {
            ListNumber = listNumber;
            Service.createList();
        });
    }

    createList() {
        ListCount++;

        var list = document.createElement('div');
        list.className += "list";

        var titlediv = document.createElement('div');
        titlediv.className += "title";
        var title = document.createElement('p');
        title.id = "mainTitle" + (ListCount).toString();
        titlediv.appendChild(title);

        var unorderedList = document.createElement('ul');
        unorderedList.id = "todoList" + ListCount;

        var titleInput = document.createElement('input');
        titleInput.id = "titleInput" + ListCount;
        titleInput.value = "";

        var titleButton = document.createElement('button');
        titleButton.id = "titleButton" + ListCount;
        titleButton.innerHTML = "Add Title";
        titleButton.type = "submit";

        var elementInput = document.createElement('input');
        elementInput.id = "elementInput" + ListCount;
        elementInput.value = "";

        var inputButton = document.createElement('button');
        inputButton.id = "inputButton" + ListCount;
        inputButton.innerHTML = "Add Element"
        inputButton.type = "submit";

        var addListButton = document.createElement('button');
        addListButton.id = "addListButton" + ListCount;
        addListButton.innerHTML = "Add List";
        addListButton.type = "submit";

        elementInput.style.display = "none";
        inputButton.style.display = "none";

        list.appendChild(titlediv);
        list.appendChild(unorderedList);
        list.appendChild(titleInput);
        list.appendChild(titleButton);
        list.appendChild(elementInput);
        list.appendChild(inputButton);
        list.appendChild(addListButton);
        document.body.appendChild(list);

        this.addButtonFunctionality(ListCount);
    }
}
const Service = Object.freeze(new ListService());
export default Service;