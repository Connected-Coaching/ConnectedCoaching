const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const athlete = urlParams.get('athlete')
// Sonav, from the Index.html, I have passed in if they are going to be a coach or an athlete
// If you could store athlete in firebase so that we know, that would be good
console.log(athlete);
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }