const para = document.getElementById('para');

const xhrregister = new XMLHttpRequest();
const xhrlogin = new XMLHttpRequest();

const email = document.getElementById('email');
const context = document.getElementById('context');
const picID = document.getElementById('picID');

function addcontext() {
    xhrregister.open("POST", "http://localhost:8000/OAO/api/addmessage/", true);
    xhrregister.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    let val = {
        picID: picID.value,
        email: email.value,
        context: context.value,
    };
    xhrregister.send(JSON.stringify(val));
    xhrregister.onreadystatechange = function() {
        if (xhrregister.readyState === 4 && xhrregister.status === 200) {
            para.innerHTML = "addContext: " + xhrregister.responseText;
        }
    }
}

function addLikes() {
    xhrregister.open("POST", "http://localhost:8000/OAO/api/addlike/", true);
    xhrregister.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    let val = {
        picID: picID.value
    };
    xhrregister.send(JSON.stringify(val));
    xhrregister.onreadystatechange = function() {
        if (xhrregister.readyState === 4 && xhrregister.status === 200) {
            para.innerHTML = "addLikes: " + xhrregister.responseText;
        }
    }
}

function cancelLikes() {
    xhrregister.open("POST", "http://localhost:8000/OAO/api/cancellike/", true);
    xhrregister.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    let val = {
        picID: picID.value
    };
    xhrregister.send(JSON.stringify(val));
    xhrregister.onreadystatechange = function() {
        if (xhrregister.readyState === 4 && xhrregister.status === 200) {
            para.innerHTML = "cancelLikes: " + xhrregister.responseText;
        }
    }
}

function dispLikes() {
    xhrregister.open("POST", "http://localhost:8000/OAO/api/displikes/", true);
    xhrregister.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    let val = {
        picID: picID.value
    };
    xhrregister.send(JSON.stringify(val));
    xhrregister.onreadystatechange = function() {
        if (xhrregister.readyState === 4 && xhrregister.status === 200) {
            para.innerHTML = "dispLikes: " + xhrregister.responseText;
        }
    }
}