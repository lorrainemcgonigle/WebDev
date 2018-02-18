var database;

function onload(){var config = {
    apiKey: "AIzaSyDiUcBb8L5PHUCMs3NQTbK6tv-FzGQrUHs",
    authDomain: "cosmet-users.firebaseapp.com",
    databaseURL: "https://cosmet-users.firebaseio.com",
    projectId: "cosmet-users",
    storageBucket: "cosmet-users.appspot.com",
    messagingSenderId: "8164921910"
    };
    firebase.initializeApp(config);
    database = firebase.database();
    console.log(firebase);    
} 
/**
 * Function below deals with a new user signing up for the app. Gets the email and password
 * value and passes them into the createUser method. Also makes sure that the password is
 * valid and handles any errors that may occur
 */
function handleSignUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 6) {
      alert('Please enter a valid email address');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a valid password');
      return;
    }
    // Once the email and password are valid begin the sign in with email and password method.
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      //If there are errors execute the code below
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('Weak password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);//log the error in the console
    });
    
    done();//call the done method to move out of the screen
  }
/**
 * Function below will deal with the user signing in. At the minute it assumes that the user isn't
 * already signed in to their account. 
 */
  function signIn() {
      var email2 = document.getElementById('email2').value;
      var password2 = document.getElementById('password2').value;
      //begin the signIn method and pass in the email and password
      firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
        // if any errors handle here
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);//log the error to the console
      });
      done();//call the done method to move off the screen
    }
   
/**
 * function below deals with the option to write data to the database 
 * 
 */
  function writeData(name, age){
    database = firebase.database();
    var ref = database.ref('users');
    ref.on('value', getData, errData);
    var name = document.getElementById("name").value;//get the value from the user
    var age = document.getElementById("age").value;//get the value from the user
    var ref = database.ref('users/');//i want to access the users node in the tree structure
    //bind the data
    var data = {
        name: name, 
        age: age
    }
    //push the data to the database
    console.log(data);
    ref.push(data);
}
/**
 * function below deals with a user request to retrieve data from
 * the database. 
 */
function getData(){
var heading = document.getElementById("list");//finds the element in the doc and displays all the details in a string

var firebaseHeadingRef = firebase.database().ref().child("users");
firebaseHeadingRef.on('value', function(datasnapshot) {
    datasnapshot.forEach(function(item){
        heading.innerText = JSON.stringify(datasnapshot.val());
    })  
});


}
//temporary simple method to move off the current screen to a new screen
  function done(){
    window.location = 'success.html';
}
function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
  }