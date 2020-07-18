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
    var 

    innerDiv.appendChild(title)
    outerDiv.appendChild(innerDiv);
    document.getElementById("startPlacingHere").appendChild(outerDiv)
}