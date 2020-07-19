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

var db = firebase.firestore();

//gets called after page load
function startedUp(){
    window.alert(document.cookie)
    document.getElementById("selectionMenu").style.display = "none";

    //makes sure that the person has been added to the database
    var addUsername = db.collection('users').doc(userg.email);
    var setWithMerge = addUsername.set({
        "name":userg.displayName,
        // make sure to change this to false for students
        "coach":true
    }, { merge: true });

    console.log("doing stuff")
    //draws each one of the classes that are pertinent to the coach
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
        window.alert("count"+count);
        if(count>0){
            document.getElementById("introContainer").style.display = "none";
        }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });



}
// In progress for adding everything 

// you can just put in the name of the cookie you want to get (like "email"), and it will return what it is
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
function makeInvisible(){
    document.getElementById("selectionMenu").style.display = "none";
}
function showSelectionMenu(){
    document.getElementById("selectionMenu").style.display = "block";
}
  //to avoid errors with arrays not being well supported, I created another collection (and another document)
  //adds it into user database
  function addClass(){
    var createTheClass = db.collection('users').doc(userg.email).collection("classes").doc(document.getElementById("nameOfClass").value);
    createTheClass.get()
    .then((docSnapshot) => {
    if (docSnapshot.exists) {
      createTheClass
        .onSnapshot((doc) => {
            console.log("class exists");

            createTheClass.set({
            "name":document.getElementById("nameOfClass").value,
            "created":true
            }).then(function() {
                console.log("Document successfully written!");

                var assignments = []
                db.collection("classes").doc(document.getElementById("nameOfClass").value).collection("assignments")
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        assignments.push(doc.id)
                    });
                    console.log(assignments)
                    createClassCard(document.getElementById("nameOfClass").value,assignments)
    
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
            
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
    console.log(document.getElementById("nameOfClass").value+"")
    
    
  }
function addActivity(className){

}

function createClassCard(titleText, days){
    var outerButton = document.createElement("button");
    outerButton.style.width = "100%"
    outerButton.onclick = function(){
        window.location.href = "/viewActivity.html?class="+titleText;
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
    document.getElementById("startPlacingHere").append(outerButton)
}