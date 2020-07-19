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
    window.alert(classChosen);
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

  function createClassCard(titleText, days){
    var outerButton = document.createElement("button");
    outerButton.onclick = "addActivity("+titleText+")"
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
    document.getElementById("startPlacingHere").append(outerButton)
}