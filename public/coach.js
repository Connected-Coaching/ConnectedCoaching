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
    createClassCard();

}
// In progress for adding everything 
function createClassCard(){
    var days = ["monday","tuesday"]

    var outerDiv = document.createElement("div");
    outerDiv.id = "outerClassDiv";
    var innerDiv = document.createElement("div");
    innerDiv.style.width = "80%"
    innerDiv.style.marginLeft = "10%"
    var title = document.createElement("h1");
    title.innerHTML = "Put name here"
    var floatedDiv = document.createElement("div");
    floatedDiv.style.width = "100%";
    

    innerDiv.appendChild(title)
    outerDiv.appendChild(innerDiv);
    document.getElementById("startPlacingHere").appendChild(outerDiv)
}