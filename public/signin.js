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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const athlete = urlParams.get('athlete');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    console.log("user: ");
    console.log(user);

    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    window.alert(displayName)

    document.cookie = "displayName = "+displayName;
    document.cookie = "email = "+email;
    document.cookie = "emailVerified = "+emailVerified;
    document.cookie = "photoURL = "+photoURL;
    document.cookie = "isAnonymous = "+isAnonymous;
    document.cookie = "uid = "+uid;
    document.cookie = "providerData = "+providerData;

    alert(document.cookie);

    window.location.href = "/coach.html";
    // ...
  } else {
    // User is signed out.
    // ...
    console.log('si.js user is signed out');
  }
});

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

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

ui.start('#firebaseui-auth-container', uiConfig);