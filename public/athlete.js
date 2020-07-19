var firebaseConfig = {
    apiKey: "AIzaSyDgUc2VayMTmwXgDeu4AlS9l9N6mulVIrw",
    authDomain: "connected-coaching-283705.firebaseapp.com",
    databaseURL: "https://connected-coaching-283705.firebaseio.com",
    projectId: "connected-coaching-283705",
    storageBucket: "connected-coaching-283705.appspot.com",
    messagingSenderId: "815003298486",
    appId: "1:815003298486:web:1dba374d809ed00bac5417",
    measurementId: "G-TRHKGBYTQ8"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var db = firebase.firestore();
var userg;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var classChosen = urlParams.get('class')


  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectURL) {

        // window.location.href = "/coach.html";
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        console.log(authResult);

        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'https://connectedcoaching.web.app/coach.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
    //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

//connected-coaching-283705.firebaseapp.com
  




firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        if (classChosen == null)
            homePage();
        else {
            classAssignmentsPage();
        }

        // document.cookie = "user = " + user;

        userg = user;


        console.log("here 1");
        console.log(user);
        console.log(user.email);
        console.log(user.displayName);
        var addUsername = db.collection('users').doc(user.email);
        console.log("here 43");
        var setWithMerge = addUsername.set({
            "name":user.displayName,
            "coach":true
        }, { merge: true });

        var count = 0;
        db.collection("users").doc(userg.email).collection("classes")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                count++;
                console.log(doc.id, " => ", doc.data());
                var assignments = []
                db.collection("classes").doc(doc.id).collection("assignments")
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc2) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc2.id, " => ", doc2.data());
                        assignments.push(doc2.id)
                    });
                    console.log(assignments)
                    console.log(doc.data.name)
                    createClassCard(doc.id,assignments)

                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            });
            if(count>0){
                document.getElementById("introContainer").style.display = "none";
            }
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    } else {
        //no user
        console.log("there is no user");
        signInPage();
        ui.start('#firebaseui-auth-container', uiConfig);

    }
  });

//gets called after page load

// In progress for adding everything 

// you can just put in the name of the cookie you want to get (like "email"), and it will return what it is
function createActivityCard(titleText, days){


    var outerDiv = document.createElement("div");
    outerDiv.id = "outerClassDiv";
    var innerDiv = document.createElement("div");
    innerDiv.style.width = "90%"
    innerDiv.style.marginLeft = "5%"
    var title = document.createElement("h1");
    title.innerHTML = titleText
    if(title.innerHTML.length>14){
        title.innerHTML = title.innerHTML.substring(0,14)+"..."
    }
    title.style.margin = "2%";
    title.style.marginLeft = "0%";
    var floatedDiv = document.createElement("div");
    floatedDiv.style.width = "100%";
    floatedDiv.style.overflow = "hidden";
    console.log("huh")

    

    var eachTitleDiv = document.createElement("div");
    eachTitleDiv.style.float = "left";
    console.log("what?")
    eachTitleDiv.style.width = "100%"

    var eachTitle = document.createElement("h2");
    eachTitle.innerHTML = days;
    eachTitle.style.margin = "0%";
    eachTitle.style.width = "100%"
    eachTitle.style.float = "left"
    eachTitleDiv.appendChild(eachTitle)

    
    floatedDiv.appendChild(eachTitleDiv)


    outerDiv.style.marginBottom = "5%"

    innerDiv.appendChild(title);
    innerDiv.appendChild(floatedDiv);
    outerDiv.appendChild(innerDiv);
    document.getElementById("startPlacingHere").append(outerDiv)
}

function makeInvisible(){
    document.getElementById("selectionMenu").style.display = "none";
}
function showCreateClassDiv(){
    document.getElementById("createClassDiv").style.display = "block";
}
function hideCreateClassDiv(){
    document.getElementById("createClassDiv").style.display = "none";
    document.getElementById("newClassName").value = "";
}
function signInPage() {
    document.getElementById("signInDiv").style.display = "block";
    document.getElementById("myClassesDiv").style.display = "none";
    document.getElementById("createClassDiv").style.display = "none";
    document.getElementById("classAssignmentsDiv").style.display = "none";
    document.getElementById("addActivityDiv").style.display = "none";
}

function homePage() {
    document.getElementById("signInDiv").style.display = "none";
    document.getElementById("myClassesDiv").style.display = "block";
    document.getElementById("createClassDiv").style.display = "none";
    document.getElementById("classAssignmentsDiv").style.display = "none";
    document.getElementById("addActivityDiv").style.display = "none";
}

function classAssignmentsPage() {
    document.getElementById("signInDiv").style.display = "none";
    document.getElementById("myClassesDiv").style.display = "none";
    document.getElementById("createClassDiv").style.display = "none";
    document.getElementById("classAssignmentsDiv").style.display = "block";
    document.getElementById("addActivityDiv").style.display = "none";

    var classData = db.collection("classes").doc(classChosen);

    document.getElementById("titleText").innerHTML = classChosen;

    var count = 0;
    classData.collection("assignments")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            createActivityCard(doc.id, doc.data().sets)
            count++;
        });
        console.log(count);
        if(count>0){
            document.getElementById("introContainer").remove();
        }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function hideAddActivity(){
    document.getElementById("addActivityDiv").style.display = "none"
}
function showAddActivity(){
    document.getElementById("addActivityDiv").style.display = "block"
}

function signOutUser() {
    alert("signing out");
    // deleteAllCookies();
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        deleteAllCookies("user");
        document.location.href = "/index.html"
        console.log("successful sign out");
      }).catch(function(error) {
        console.log(error);
      });
}

  //to avoid errors with arrays not being well supported, I created another collection (and another document)
  //adds it into user database
function homePage() {
    document.getElementById("signInDiv").style.display = "none";
    document.getElementById("myClassesDiv").style.display = "block";
    document.getElementById("createClassDiv").style.display = "none";
    document.getElementById("classAssignmentsDiv").style.display = "none";
    document.getElementById("addActivityDiv").style.display = "none";
}

function addClass(){
    var createTheClass = db.collection('users').doc(userg.email).collection("classes").doc(document.getElementById("newClassName").value);
    var specificClass = db.collection("classes").doc(document.getElementById("newClassName").value)
    specificClass.get()
    .then((docSnapshot) => {
    if (docSnapshot.exists) {
            console.log("class exists");

            createTheClass.set({
            "name":document.getElementById("newClassName").value,
            "created":true
            }).then(function() {
                console.log("Document successfully written!");

                var assignments = []
                db.collection("classes").doc(document.getElementById("newClassName").value).collection("assignments")
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        assignments.push(doc.id)
                    });
                    console.log(assignments)
                    createClassCard(document.getElementById("newClassName").value,assignments)
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
            
    }else{
        window.alert("That class does not exist")
    }
  });

    // createTheClass.set({
    //     "name":document.getElementById("nameOfClass").value,
    //     "created":true
    // }).then(function() {
    //     console.log("Document successfully written!");
    // })
    // .catch(function(error) {
    //     console.error("Error writing document: ", error);
    // });


    //adds the class to the other root

    console.log("Hello?")
    console.log(document.getElementById("newClassName").value+"")
    
    
  }
function addActivity(className){

}

function createClassCard(titleText, days){
    var outerButton = document.createElement("button");
    outerButton.style.width = "100%"
    outerButton.style.marginBottom = "5%"

    outerButton.onclick = function(){
        window.location.href = "/athlete.html?class="+titleText;
    }
    console.log("viewActivity(\""+titleText+"\")")
    outerButton.style.border = "none";

    var outerDiv = document.createElement("div");
    outerDiv.id = "outerClassDiv";
    var innerDiv = document.createElement("div");
    innerDiv.style.width = "90%"
    innerDiv.style.marginLeft = "5%"
    var title = document.createElement("h1");
    title.innerHTML = titleText
    title.style.textAlign = "left"
    if(title.innerHTML.length>16){
        title.innerHTML = title.innerHTML.substring(0,16)+"..."
    }
    title.style.margin = "2%";
    title.style.marginLeft = "0%";
    var floatedDiv = document.createElement("div");
    floatedDiv.style.width = "100%";
    floatedDiv.style.overflow = "hidden";
    console.log("huh")

    

    var eachTitleDiv = document.createElement("div");
    eachTitleDiv.style.float = "left";
    eachTitleDiv.style.width = "60%"
    for(var i = days.length-1;i>days.length-4;i--){
        if(i>=0){
            var eachTitle = document.createElement("h2");
            eachTitle.innerHTML = days[i];
            eachTitle.style.margin = "0%";
            eachTitle.style.width = "52%"
            eachTitle.style.float = "left"
            eachTitle.style.textAlign = "left"
            eachTitle.style.paddingBottom = "1%"
            eachTitleDiv.appendChild(eachTitle)
        }else{
            var eachTitle = document.createElement("h2");
            eachTitle.innerHTML = "";
            eachTitle.appendChild(document.createElement("br"))
            eachTitle.style.margin = "0%";
            eachTitle.style.width = "52%"
            eachTitle.style.float = "left"
            eachTitleDiv.appendChild(eachTitle)
        }
    }
    floatedDiv.appendChild(eachTitleDiv)


    

    innerDiv.appendChild(title);
    innerDiv.appendChild(floatedDiv);
    outerDiv.appendChild(innerDiv);
    outerButton.appendChild(outerDiv);
    document.getElementById("classCards").append(outerButton)
}