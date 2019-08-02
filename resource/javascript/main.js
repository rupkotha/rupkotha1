let bookID = 1
let page = 1

let book = 10000 + bookID + ''
let text = 'dummy'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEaFcnSF0p2AR3JkdyVUgo0Ifno2EfG2M",
    authDomain: "rupkotha.firebaseapp.com",
    databaseURL: "https://rupkotha.firebaseio.com",
    projectId: "rupkotha",
    storageBucket: "rupkotha.appspot.com",
    messagingSenderId: "403571374607",
    appId: "1:403571374607:web:7dac8cb170ab8730"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.database();
let obj = document.getElementById("textid");

function previous() {
    page--;
    pageData();
}

function next() {
    page++;
    pageData();
}

function addModified() {
    obj.value = modified;
}

function clearText() {
    obj.value = "";
}

function submit() {
    data = obj.value;
    newVolunteer = document.getElementById("newVolunteer").value
    if (newVolunteer == '')
        newVolunteer = 'UNKNOWN'

    var ref = db.ref("book/" + book + "/pages/" + pageName);
    ref.update({
        "text": data,
        "volunteer": newVolunteer,
        "version": Number(document.getElementById("version").value) + 1
    })

    pageData()
}

function addRaw() {
    obj.value = raw;
}

function addFilter() {
    obj.value = filter;
}

function pageData() {
    pageName = 1000 + page + '';
    ref = db.ref("book/" + book + "/pages/" + pageName);

    ref.on("value", function (snapsot) {
        document.getElementById("image").src = snapsot.val().image;
        document.getElementById("version").value = snapsot.val().version;
        document.getElementById("volunteer").value = snapsot.val().volunteer;
        document.getElementById("format").value = snapsot.val().format;
        document.getElementById("proof").value = snapsot.val().proof;
        document.getElementById("page").value = pageName;
        document.getElementById("projectid").value = book;

        modified = snapsot.val().text;
        raw = snapsot.val().raw;
        filter = snapsot.val().filter;

        document.getElementById("textid").value = modified;
    })
}

function go() {
    page = Number(document.getElementById("goPage").value)
    bookID = Number(document.getElementById("goBook").value)
    book = 10000 + bookID + ''
    pageData();
}