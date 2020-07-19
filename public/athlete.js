function startedUp(){
    createClassCard("Coach Raffi's Hell",["Monday","Tuesday","Wednesday","Thursday","Friday"]);

}
// In progress for adding everything 
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
    for(var i = 0;i<days.length && i<3;i++){
        var eachTitle = document.createElement("h2");
        eachTitle.innerHTML = days[i];
        eachTitle.style.margin = "0%";
        eachTitle.style.width = "52%"
        eachTitle.style.float = "left"
        eachTitleDiv.appendChild(eachTitle)
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