
const y_select = document.getElementById("y-select");
const x_buttons = document.querySelectorAll(".x-button");
const r_buttons = document.querySelectorAll(".r-button");
const submit_button = document.getElementById("submit-button");
const clear_button = document.getElementById("clear-button");
const result_table = document.getElementById("result-table");
let last_x_button, last_r_button, last_row;

function addToTable(data) {
    let row = result_table.insertRow();
    let cellId = 0;
    row.insertCell(cellId++).innerText = data.x;
    row.insertCell(cellId++).innerText = data.y;
    row.insertCell(cellId++).innerText = data.r;
    row.insertCell(cellId++).innerText = data.result ? 'Попал!' : 'Промазал :(';
    row.insertCell(cellId++).innerText = new Date(data.datetime).toLocaleTimeString();
    row.insertCell(cellId++).innerText = data.exectime + 'ms';

    if(last_row !== undefined) last_row.className = '';
    row.classList.add(data.result ? 'last-row-hit' : 'last-row-miss');
    last_row = row;

    result_table.scrollTo(0, result_table.scrollHeight);
}

function borderRed(id) {
    let element = document.getElementById(id);
    element.classList.add("red-border");
    setTimeout(() => {
        element.classList.remove("red-border");
    }, 1500);
}


function onLoad(ev) {
    graphEntry();

    for(let btn of x_buttons) {
        btn.addEventListener("click", ev => {
            if(last_x_button !== undefined) last_x_button.classList.remove("selected");
            btn.classList.add("selected");
            last_x_button = btn;
        })
    }
    for(let btn of r_buttons) {
        btn.addEventListener("click", ev => {
            if(last_r_button !== undefined) last_r_button.classList.remove("selected");
            btn.classList.add("selected");
            last_r_button = btn;
            makeGraph(+btn.value);
        })
    }

    submit_button.addEventListener("click", ev => {
        let x, y, r, correct = true;
        if(last_x_button === undefined) {
            borderRed("x-cell");
            correct = false;
        } else {
            x = +last_x_button.value;
        }
        y = +y_select.value;
        if(y_select.value.length === 0 || Number.isNaN(y) || Math.abs(y) >= 5) {
            borderRed("y-cell");
            correct = false;
        }
        if(last_r_button === undefined) {
            borderRed("r-cell");
            correct = false;
        } else {
            r = +last_r_button.value;
        }

        if(!correct) return;

        checkHit(x, y, r);
        drawPoint(x, y);

    });

    clear_button.addEventListener("click", ev => {
        sendRequest({command: "clear"});
        location.reload();
    });


    initialize();
}

window.addEventListener("load", onLoad);