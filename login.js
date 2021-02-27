
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

//Not working
function signupclick(){
    //var user = document.getElementById("user");
    var emails = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.createUserWithEmailAndPassword(emails.value, password.value);
    promise.then(cred => {
        firebase.database().ref("/users/" + user.uid).set({
            name: document.getElementById("user").value,
            email: document.getElementById("email").value
        });
    })
    promise.then(() => {
        alert("You signed up! Now login with your credentials.");
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

function displayUser(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/name");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("display").innerHTML = JSON.stringify(data)
    });
        } else {
          // No user is signed in.
            document.getElementById("display").innerHTML = "You are not signed in!"
        }
      });
    
}
  
function home(){
    window.location="home.html";
}

function changeuser(){
    var userId = firebase.auth().currentUser.uid;
    database.ref("users/" + userId).set({
        name: document.getElementById("user").value
    });
    displayUser();
}

function createchores(){
    window.location="createChores.html";
}

function missions(){
    window.location="missions.html";
}

function createchore(){
    var userId = firebase.auth().currentUser.uid;
    var choreListRef = firebase.database().ref('users/' + userId + "/chores");
    var newChoreRef = choreListRef.push();
    newChoreRef.set({
        cname: document.getElementById("cName").value,
        cdescription: document.getElementById("cDescription").value,
        ccredits: +document.getElementById("cCredits").value,
        cexp: +document.getElementById("cExp").value
});
    displayChores();
}

//Not working
function displayChores(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var r = firebase.database().ref('/users/' + user.uid + "/chores");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayChores").innerHTML = JSON.stringify(data)
    });
        } 
        else {
            document.getElementById("displayChores").innerHTML = "No chores created... YET!"
        }
    });
}

function displayCredits(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/chores").orderByChild("/ccredits").limitToFirst(1);
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayCredits").innerHTML = JSON.stringify(data);
            
    });
        } else {
          // No user is signed in.
            document.getElementById("displayCredits").innerHTML = "You are not signed in!"
        }
      });
}

function done(){
    

}



