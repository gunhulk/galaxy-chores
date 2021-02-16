
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyC5QHaYUnk-U5H9YHDaqobrTdl5PpysvyY",
authDomain: "galaxy-chores.firebaseapp.com",
databaseURL: "https://galaxy-chores-default-rtdb.firebaseio.com",
projectId: "galaxy-chores",
storageBucket: "galaxy-chores.appspot.com",
messagingSenderId: "411919216683",
appId: "1:411919216683:web:208dccfb7b6c3378533a6e",
measurementId: "G-S2Y15P3DGH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();

function signup(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    alert("You Signed Up");
}

function login(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    alert("Logged In " + email.value);
    //Jump to another page!
}

function logout(){
    auth.logout()
    alert("You Logged Out");
    // Put this on another page
}

auth.onAuthStateChanged(function(user){
    if(user){
        var email = user.email;
        alert("Active User " + email);
    }

    else{
        alert("No user is signed in");
    }
});

function forgotPassword(){
    window.location="resetPassword.html"
}

function sendEmail(){
    var inputEmail = document.getElementById("inputEmail");
    firebase.auth().sendPasswordResetEmail(inputEmail.value)
    alert("Password Recovery Email Sent");
}
