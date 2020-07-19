const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const classChosen = urlParams.get('class')

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyCH1DEQxf17qHLYz5Bf_H0zmlX9VmWUmP0',
    authDomain: 'connected-coaching-283705.firebaseapp.com',
    projectId: 'connected-coaching-283705'
});
  
var db = firebase.firestore();
const classData = db.collection("classes").doc(classChosen);

function startedUp(){
    document.getElementById("selectionMenu").style.display = "none";

    document.getElementById("titleText").innerHTML = classChosen;

    var count = 0;
    classData.collection("assignments")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            createClassCard(doc.id, doc.data().sets)
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
function addWorkout(){
    document.getElementById("selectionMenu").style.display = "none";
    var gettingToDate = classData.collection("assignments").doc(document.getElementById("date").value);
    gettingToDate.set({
        "sets":document.getElementById("workout").value
    }).then(function() {
        console.log("Document successfully written!");
        console.log(document.getElementById("workout").value);
        createClassCard(document.getElementById("date").value,document.getElementById("workout").value)
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
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
function makeInvisible(){
    document.getElementById("selectionMenu").style.display = "none"
}
function showPrompt(){
    document.getElementById("selectionMenu").style.display = "block"
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