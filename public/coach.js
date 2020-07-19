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



// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var userg;

// var redirectURL = "/coach.html";
var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectURL) {

        // window.location.href = "/coach.html";
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        console.log(authResult);
        window.alert(authResult.displayName);

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
  
var db = firebase.firestore();

// handle signed in and out users
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        homePage();

        document.cookie = "user = " + user;

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

        console.log("here 2");
        db.collection("users").doc(user.email).collection("classes")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    createClassCard(doc.id, ["monday","tuesday"])
                });
                console.log("here 3");
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
function startedUp(){
    window.alert(document.cookie);

    console.log("doing stuff");
    //draws each one of the classes that are pertinent to the coach
    
}



  function createClassInDB() {

    //gives coach the class in db
    var createTheClass = db.collection('users').doc(userg.email).collection("classes").doc(document.getElementById("newClassName").value);
    createTheClass.set({
        "name":document.getElementById("newClassName").value,
        "created":true
    }).then(function() {
        console.log("Document successfully written!");
        createClassCard(document.getElementById("newClassName").value,[''])
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    // adds the class to classes collection
    var addToRoot = db.collection("classes").doc(document.getElementById("newClassName").value);
    addToRoot.set({
        "owner":userg.email
    }).then(function(){

    }).catch(function(error){
        console.error("Error with adding to the big classes list")
    });

    hideCreateClassDiv();

  }

  function createClassCard(titleText, days){
    var outerButton = document.createElement("button");
    outerButton.onclick = function(){
        window.location.href = "/addActivity.html?class="+titleText;
    }
    console.log("addActivity(\""+titleText+"\")")
    outerButton.style.border = "none";

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
    eachTitleDiv.style.width = "60%"
    for(var i = 0;i<3;i++){
        if(i<days.length){
            var eachTitle = document.createElement("h2");
            eachTitle.innerHTML = days[i];
            eachTitle.style.margin = "0%";
            eachTitle.style.width = "52%"
            eachTitle.style.float = "left"
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


    var button = document.createElement("button");
    var img = document.createElement("img")
    img.src = "Images/add.png";
    button.style.width = "25%";
    button.style.position = "relative";
    // button.style.left = "50%";
    // button.style.top = "-20%"
    button.style.float  = "left";
    img.className = "plusImage";
    button.className = "addButton";
    
    button.appendChild(img)
    floatedDiv.appendChild(button);

    innerDiv.appendChild(title);
    innerDiv.appendChild(floatedDiv);
    outerDiv.appendChild(innerDiv);
    outerButton.appendChild(outerDiv);
    document.getElementById("classCards").append(outerButton)
}

function showCreateClassDiv() {
    document.getElementById("createClassDiv").style.display = "block";
    // document.getElementById("createClassDiv");
}

function hideCreateClassDiv() {
    document.getElementById("createClassDiv").style.display = "none";
    document.getElementById("newClassName").value = "";
}

function signInPage() {
    document.getElementById("signInDiv").style.display = "block";
    document.getElementById("myClassesDiv").style.display = "none";
    document.getElementById("createClassDiv").style.display = "none";
}

function homePage() {
    document.getElementById("signInDiv").style.display = "none";
    document.getElementById("myClassesDiv").style.display = "block";
    document.getElementById("createClassDiv").style.display = "none";
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

function delete_cookie( name ) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }