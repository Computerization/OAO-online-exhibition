function back() {
    history.go(-1);
};

var dispUrl = sessionStorage.getItem("imgUrl")
document.getElementById("bgImg").setAttribute("src", dispUrl)
document.getElementById("dispImg").setAttribute("src", dispUrl)

function logPic(id,name,author,text) {
    var o = new Object();
    o.id = id;
    o.name = name;
    o.author = author;
    o.text = text;
    return o;
}

var a1 = logPic('a1','NAME1','AUT1','TEXTTEST1')
var a2 = logPic('a2','NAME2','AUT2','TEXTTEST2')
var a3 = logPic('a3','NAME3','AUT3','TEXTTEST3')
var a4 = logPic('a4','NAME4','AUT4','TEXTTEST4')
var a5 = logPic('a5','NAME5','AUT5','TEXTTEST5')



var dispId = sessionStorage.getItem("imgId")
document.getElementById("picName").innerHTML = eval(dispId).name
document.getElementById("picAuthor").innerHTML = eval(dispId).author
document.getElementById("picText").innerHTML = eval(dispId).text