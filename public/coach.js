// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyCH1DEQxf17qHLYz5Bf_H0zmlX9VmWUmP0',
    authDomain: 'connected-coaching-283705.firebaseapp.com',
    projectId: 'connected-coaching-283705'
});
  
var db = firebase.firestore();

function createClass() {
    var className = document.getElementById("newClassNameInput");
    if (className.value != "") {
        db.collection("")
    }
}

function startedUp(){
    window.alert(document.cookie)

    //makes sure that the person has been added to the database
    var addUsername = db.collection('users').doc(getCookie("email"));
    var setWithMerge = addUsername.set({
        "name":getCookie("displayName"),
        // make sure to change this to false for students
        "coach":true
    }, { merge: true });

    console.log("doing stuff")
    db.collection("users").doc(getCookie("email")).collection("classes")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            createClassCard(doc.id, ["monday","tuesday"])
        });
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

  //to avoid errors with arrays not being well supported, I created another collection (and another document)
  //adds it into user database
  function addClass(){
    var createTheClass = db.collection('users').doc(getCookie("email")).collection("classes").doc(document.getElementById("nameOfClass").value);
    createTheClass.set({
        "name":document.getElementById("nameOfClass").value,
        "created":true
    }).then(function() {
        console.log("Document successfully written!");
        createClassCard(document.getElementById("nameOfClass").value,[''])
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });


    //adds the class to the other root
    var addToRoot = db.collection("classes").doc(document.getElementById("nameOfClass").value);
    addToRoot.set({
        "owner":getCookie("email")
    }).then(function(){

    }).catch(function(error){
        console.error("Error with adding to the big classes list")
    })

    console.log("Hello?")
    console.log(document.getElementById("nameOfClass").value+"")
    
    
  }

  function createClassCard(titleText, days){


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
    document.getElementById("startPlacingHere").appendChild(outerDiv)
}