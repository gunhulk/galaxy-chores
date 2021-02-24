
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
var database = firebase.database();


function signup(){
    window.location="signup.html"
}

function signupclick(){
    var user = document.getElementById("user")
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.then(cred => {
        alert("You signed up! Now login with your credentials.")
        window.location="login.html";
    })
    promise.catch(e => {
        alert(e.message);
    })
}

function login(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.then(cred => {
        window.location="home.html";
        var userId = firebase.auth().currentUser.uid;
        database.ref("users/" + userId).set({
            email: email.value
    });
    })
    promise.catch(e => {
        alert(e.message);
    })  
}

function logout(){
    auth.signOut();
    window.location="login.html";
    alert("You Logged Out");
    
}

function forgotPassword(){
    window.location="resetPassword.html";
}

function sendEmail(){
    var inputEmail = document.getElementById("inputEmail");
    firebase.auth().sendPasswordResetEmail(inputEmail.value);
    alert("Password Recovery Email Sent");
}

function settings(){
    window.location="settings.html";
}

function changeuser(){
    var userId = firebase.auth().currentUser.uid;
    database.ref("users/" + userId).set({
        name: document.getElementById("user").value
    });
    displayUser();
}

function displayUser(){
    database.ref("/users/").once('value' , function(snapshot){
        snapshot.forEach(function(childSnapshot)
        {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            document.getElementById("display").innerHTML = childData['name']
        })
    })
}

function displayEmail(){
    database.ref("/users/").once('value' , function(snapshot){
        snapshot.forEach(function(childSnapshot)
        {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            document.getElementById("display").innerHTML = childData['email']
        })
    })
}
  
function home(){
    window.location="home.html";
}

