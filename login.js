
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
    var emails = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.createUserWithEmailAndPassword(emails.value, password.value);
    promise.then(cred => {
        alert("You signed up! Now login with your credentials.");
        window.location="login.html"; 
    });       
    promise.catch(e => {
        alert(e.message);
    });
}

function setup(){ 
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var email = user.email;
    var uListRef = firebase.database().ref('users/' + userId);
    uListRef.set({
        name: document.getElementById("user").value,
        email: email,
        rank: "Cadet",
        credits: 0,
        exp: 0,
        lvl: 0,
        setup: "done"
}).then(function() {
    window.location = "home.html";
});
}

function login(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.then(cred => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var r = firebase.database().ref('/users/' + user.uid + "/setup");
                r.on('value', (snapshot) => {
                const data = snapshot.val();
                if("done" === data){
                    window.location="home.html";
                }
                else{
                    window.location="setup.html";
                }
            })
        }
    })
        });
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

function popup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

function settings(){
    window.location="settings.html";
}

function displayUserName(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/name");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayName").innerHTML = data;
    });
        } else {
          // No user is signed in.
            document.getElementById("displayName").innerHTML = "You are not signed in!"
        }
      });  
}

function displayUserEmail(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/email");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayEmail").innerHTML = data;
    });
        } else {
          // No user is signed in.
            document.getElementById("displayEmail").innerHTML = "You are not signed in!"
        }
      });  
}

function displayUserExp(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/exp");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayExp").innerHTML = data;
    });
        } else {
          // No user is signed in.
            document.getElementById("displayExp").innerHTML = "You are not signed in!"
        }
      });  
}

function displayUserCredits(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/credits");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayCredits").innerHTML = data;
    });
        } else {
          // No user is signed in.
            document.getElementById("displayCredits").innerHTML = "You are not signed in!"
        }
      });  
}

function displayUserRank(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/rank");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayRank").innerHTML = data;
    });
        } else {
          // No user is signed in.
            document.getElementById("displayRank").innerHTML = "You are not signed in!"
        }
      });  
}
  
function home(){
    window.location="home.html";
}

function blogin(){
    window.location="login.html";
}

function changeuser(){
    var userId = firebase.auth().currentUser.uid;
    database.ref("users/" + userId).update({name: document.getElementById("user").value});
    displayUserName();
    displayUserEmail();
    displayUserExp();
    displayUserCredits();
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
    newChoreRef.update({
        clocation: document.getElementById("cLocation").value,
        cname: document.getElementById("cName").value,
        cdescription: document.getElementById("cDescription").value,
        ccredits: +document.getElementById("cCredits").value,
        cexp: +document.getElementById("cExp").value
});
    displayChoreName();
    window.location="createChores.html";
}

function edit(){
    window.location= "edit.html";
}

function editchore(){

}

function displayOneChore(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var r = firebase.database().ref('/users/' + user.uid + "/chores");
            r.on('value', (snapshot) => {
                snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val(); 
                    document.getElementById("displayOneChore").innerHTML += (String(childData["clocation"] + " " +
                    childData["cname"] + " " +
                    childData["cdescription"] + " " +
                    childData["ccredits"] + " " +
                    childData["cexp"]) + "<br />"
                    );
                  });   
    });
         
        } 
        else {
            document.getElementById("displayChores").innerHTML = "No user logged in"
        }
    });

}

function displayChoreName(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var r = firebase.database().ref('/users/' + user.uid + "/chores");
            r.on('value', (snapshot) => {
                snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val(); 
                    
                    document.getElementById("displayChores").innerHTML += (String(childData["clocation"] + " " +
                    childData["cname"] + " " +
                    childData["cdescription"] + " " +
                    childData["ccredits"] + " " +
                    childData["cexp"]) + "<br />" +
                    "<button class='chorebtn' data-value='"+childData["ccredits"]+"' value= '"+childData["cexp"]+"' onclick=\"choreDone();\">Mission Complete</button><br>" +
                    "<button onclick=\"edit();\">Edit Chore</button><br>"
                    );
                    
                  });
                     
    });
         
        } 
        else {
            document.getElementById("displayChores").innerHTML = "No user logged in"
        }
    });
}

//Almost Done! Need to let buttons work on different chores.
function displayDefaultChores(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var r = firebase.database().ref("/defaultChores/");
            r.on('value', (snapshot) => {
                snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val(); 
                    
                    document.getElementById("displayDefaultChores").innerHTML += (String(childData["clocation"] + " " +
                    childData["cname"] + " " +
                    childData["cdescription"] + " " +
                    childData["ccredits"] + " " +
                    childData["cexp"]) + "<br />" +
                    "<button class='chorebtn' data-value='"+childData["ccredits"]+"' value= '"+childData["cexp"]+"' onclick=\"choreDone();\">Mission Complete</button><br>"
                    );  
                });
                     
    });
         
        } 
        else {
            document.getElementById("displayDefaultChores").innerHTML = "No user logged in"
        }
    });
}

//Almost Done! Need to let buttons work on different chores.
function choreDone(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var i = 0;
            var r = firebase.database().ref('/users/' + user.uid + "/chores");
            var u = firebase.database().ref('/users/' + user.uid);
            const b = document.querySelectorAll(".chorebtn");
            b.forEach(childSnapshot => childSnapshot.addEventListener("click", function() {
                window.resultExp = parseInt(childSnapshot.value);
                window.resultCredits = parseInt(childSnapshot.getAttribute("data-value"));   
            }));
            u.once('value')
                .then(function(childSnap){
                    var userKey = childSnap.key;
                    window.userData = childSnap.val();
                    u.update({ 
                        credits: window.resultCredits + window.userData["credits"],
                        exp: window.resultExp + window.userData["exp"]
          });
        //levelup(); 
        location.reload();
        window.onload = levelup();

    });
            
                
                         
        } 
        else {
            document.getElementById("displayChores").innerHTML = "No user logged in"
        }
    });
    
}

//Done!
function levelup(){
    var ranks = ['Cadet', "Private", "Corporal", "Sergeant", "Master Sergeant", "Lieutenant", "First Lieutenant", "Captain", "Major", "Colonel", "General"]
    var level = 0;
    var experience = [0,100,200,400,800,1600,3200,6400,12800,25600,51200];
    var rank = "";
    var i = 0;
    var eLength = 11;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var u = firebase.database().ref('/users/' + user.uid);
            u.on('value', (snapshot) => {
                const data = snapshot.val();
                while(eLength>1){
                    eLength = eLength - 1;
                    //console.log(eLength);    
                    if(data["exp"] >= experience[i]) {
                      level = i;
                      rank = ranks[i];
                      u.update({ 
                        lvl: level,
                        rank: rank
                    });   
                    i += 1;    
                }
            }
            
        })
    }
})

}



