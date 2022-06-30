function back() {
    history.go(-1);
};

var dispUrl = sessionStorage.getItem("imgUrl")
document.getElementById("bgImg").setAttribute("src", dispUrl)
document.getElementById("dispImg").setAttribute("src", dispUrl)