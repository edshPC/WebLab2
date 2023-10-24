function sendRequest(args, callback) {
    fetch("controller?" + new URLSearchParams(args))
        .then(r => {
            return r.json();
        }).then(data => {
        if('error' in data) throw data.error;
        callback(data);
    }).catch(e => {
        if(callback !== undefined)
            alert(`Ошибка в получении ответа:\n${e}`);
    });
}

function checkHit(x, y, r) {
    sendRequest({
        command: "check",
        x, y, r
    }, addToTable);
}

function initialize() {
    sendRequest({command: "init"}, data => {
        data.entries.forEach(addToTable);
    });
}