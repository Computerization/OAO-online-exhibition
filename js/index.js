function enlarge() {
    location.href = "enlarge.html";
};

function setUrl(url, id) {
    sessionStorage.setItem("imgUrl", url);
    sessionStorage.setItem("imgId", id);
}