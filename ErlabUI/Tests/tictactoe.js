// Turn of player 0 or 1
var turn = 0;

export function BuildComponents() {
    var BuildContainer = function () {
        var container = document.createElement('div');
        container.className += 'container';
        return container;
    };
    var BuildTable = function () {
        var table = document.createElement('div');
        table.className += 'table';
        return table;
    };
    var BuildRow = function () {
        var row = document.createElement('div');
        row.className += 'row';
        return row;
    };
    var BuildButton = function (id) {
        var button = document.createElement('div');
        button.className += 'button';
        button.id = id.toString();
        return button;
    };
    var container = BuildContainer();
    document.body.appendChild(container);

    var table = BuildTable();
    document.getElementsByClassName('container')[0].appendChild(table);

    for (let i = 0; i < 3; i++) {
        document.getElementsByClassName('table')[0].appendChild(BuildRow());
    }

    for (let i = 0; i < document.getElementsByClassName('row').length; i++) {
        var rowNumber = document.getElementsByClassName('row')[i];
        for (let j = 0; j < 3; j++) {
            rowNumber.appendChild(BuildButton((i * 3) + j + 1));
        }
    }
}

export function AddFunctionality() {
    for (let i = 0; i < 9; i++) {
        var targetButton = document.getElementById((i + 1).toString());
        targetButton.addEventListener("click", function () {
            var currentButton = document.getElementById((i + 1).toString());
            if (turn == 0) {
                currentButton.style.backgroundColor = "red";
                currentButton.disabled = true;
                if (!GameFinished())
                    turn = 1;
                else {
                    console.log("Player" + turn + " Wins");
                    CloseWindow();
                }
            }
            else {
                currentButton.style.backgroundColor = "green";
                currentButton.disabled = true;
                if (!GameFinished())
                    turn = 0;
                else {
                    console.log("Player" + turn + " Wins");
                    CloseWindow();
                }
            }
        })
    }
}

function GameFinished() {
    var allButtons = document.getElementsByClassName('button');
    // Horizontal Check
    if (allButtons[0].style.backgroundColor == "red" && allButtons[1].style.backgroundColor == "red" && allButtons[2].style.backgroundColor == "red"
        || allButtons[0].style.backgroundColor == "green" && allButtons[1].style.backgroundColor == "green" && allButtons[2].style.backgroundColor == "green") {
        return true;
    }
    else if (allButtons[1].style.backgroundColor == "red" && allButtons[2].style.backgroundColor == "red" && allButtons[3].style.backgroundColor == "red"
        || allButtons[1].style.backgroundColor == "green" && allButtons[2].style.backgroundColor == "green" && allButtons[3].style.backgroundColor == "green") {
        return true;
    }
    else if (allButtons[2].style.backgroundColor == "red" && allButtons[3].style.backgroundColor == "red" && allButtons[4].style.backgroundColor == "red"
        || allButtons[2].style.backgroundColor == "green" && allButtons[3].style.backgroundColor == "green" && allButtons[4].style.backgroundColor == "green") {
        return true;
    }
    // Vertical Check
    else if (allButtons[0].style.backgroundColor == "red" && allButtons[3].style.backgroundColor == "red" && allButtons[6].style.backgroundColor == "red"
        || allButtons[0].style.backgroundColor == "green" && allButtons[3].style.backgroundColor == "green" && allButtons[6].style.backgroundColor == "green") {
        return true;
    }
    else if (allButtons[1].style.backgroundColor == "red" && allButtons[4].style.backgroundColor == "red" && allButtons[7].style.backgroundColor == "red"
        || allButtons[1].style.backgroundColor == "green" && allButtons[4].style.backgroundColor == "green" && allButtons[7].style.backgroundColor == "green") {
        return true;
    }
    else if (allButtons[2].style.backgroundColor == "red" && allButtons[5].style.backgroundColor == "red" && allButtons[8].style.backgroundColor == "red"
        || allButtons[2].style.backgroundColor == "green" && allButtons[5].style.backgroundColor == "green" && allButtons[8].style.backgroundColor == "green") {
        return true;
    }
    // Diagonal Check
    else if (allButtons[0].style.backgroundColor == "red" && allButtons[4].style.backgroundColor == "red" && allButtons[8].style.backgroundColor == "red"
        || allButtons[0].style.backgroundColor == "green" && allButtons[4].style.backgroundColor == "green" && allButtons[8].style.backgroundColor == "green") {
        return true;
    }
    else if (allButtons[2].style.backgroundColor == "red" && allButtons[4].style.backgroundColor == "red" && allButtons[6].style.backgroundColor == "red"
        || allButtons[2].style.backgroundColor == "green" && allButtons[4].style.backgroundColor == "green" && allButtons[6].style.backgroundColor == "green") {
        return true;
    }
    else {
        if (CheckButtons())
            return false;
        else {
            return true;
        }
    }
}

function CheckButtons() {
    var allButtons = document.getElementsByClassName('button');
    for (var i = 0; i < allButtons.length; i++) {
        if (!allButtons[i].disabled)
            return true;
    }
    return false;
}

function CloseWindow() {
    var window = document.getElementsByClassName('container')[0];
    window.style.setProperty('display', 'none');
}