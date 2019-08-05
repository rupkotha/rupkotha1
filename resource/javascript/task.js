let bookID = 6
let page = 1

let book = 10000 + bookID + ''
let text, version, newVolunteer, email;

let title, writer, totalPages, formatedPages, proofedPages, bestVolunteer;

let taskPages = [], lastPageInTask = 0;


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

function getBookDetails() {
    book = (10000 + bookID).toString();
    ref = db.ref("book/" + book + "/combine");
    ref.on("value", function (snapsot) {
        title = snapsot.val().title;
        writer = snapsot.val().writer;
        totalPages = snapsot.val().pages;
        formatedPages = snapsot.val().format;
        proofedPages = snapsot.val().proof;
    });
}

function getTaskedPageNumber() {
    taskPages = [];
    for (let count = 0, i = lastPageInTask + 1; i <= totalPages && count < 5; i++) {
        if (proofedPages[i] == false) {
            count++;
            taskPages.push(i);
            lastPageInTask = i;
        }
    }

    if (taskPages.length == 0) {
        for (i = 0; i < totalPages; i++)
            if (proofedPages[i] == false) {
                lastPageInTask = 0;
                break;
            }

        if (lastPageInTask == 0)
            getTaskedPageNumber();
            else
            alert("All Completed in this book. \nPlease change Book ID");
    }
    console.log(taskPages)
}

function newTask() {
    getBookDetails();
    // for (i = 0; i < 100000; i++);
    getTaskedPageNumber()
}


function newTaskaa() {

    pageName = 1000 + page + '';
    ref = db.ref("book/" + book + "/pages/" + pageName);

    ref.on("value", function (snapsot) {
        version = snapsot.val().version;

        document.getElementById("image").src = snapsot.val().image;
        document.getElementById("version").value = version;
        document.getElementById("volunteer").value = snapsot.val().volunteer;
        document.getElementById("format").value = snapsot.val().format;
        document.getElementById("proof").value = snapsot.val().proof;
        document.getElementById("page").value = page;
        document.getElementById("projectid").value = book;
        document.getElementById("goPage").value = page;
        document.getElementById("goBook").value = Number(book);

        if (newVolunteer == '')
            newVolunteer = 'UNKNOWN'

        document.getElementById("newVolunteer").value = newVolunteer

        modified = snapsot.val().text;
        raw = snapsot.val().raw;
        filter = snapsot.val().filter;

        document.getElementById("textid").value = modified;
    })
}









let obj = document.getElementById("textid");

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        newVolunteer = user.email;
        document.getElementById('login-button').innerHTML = newVolunteer;
        document.getElementById('login-button').setAttribute('href', "#");
    }
});

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

    var ref = db.ref("book/" + book + "/pages/" + pageName);
    ref.update({
        "text": data,
        "volunteer": newVolunteer,
        "version": version + 1
    })

    pageData()
}

function addRaw() {
    obj.value = raw;
}

function addFilter() {
    obj.value = filter;
}



function go() {
    page = Number(document.getElementById("goPage").value)
    book = document.getElementById("goBook").value
    pageData();
}


function registration() {

    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage)
    });
}


function isLogin() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            newVolunteer = email;
            // ...
        } else {
            // User is signed out.
            // ...
            window.location.href = 'login.html'
            login()
        }
    });
}

function login() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert(errorMessage)
    });
}

function logout() {
    firebase.auth().signOut().then(function () {
        window.location.href = "logout.html"
    }).catch(function (error) {
        // An error happened.
        alert(error)
    });
}



function goParts() {
    ref = db.ref("book/" + book + "/parts");

    ref.on("value", function (snapsot) {
        format = snapsot.val().format;
        proof = snapsot.val().proof;
        text = snapsot.val().text;
        html = snapsot.val().html;
    });

    console.log(format)
    console.log(proof)
    console.log(text)
    console.log(html)
}