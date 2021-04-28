// Start | Step 1 - Initialize
var firebaseConfig = {
    apiKey: "AIzaSyAoICtN1gTIRmn251rRvA612VcifNgB69M",
    authDomain: "dt-simple-test.firebaseapp.com",
    databaseURL: "https://dt-simple-test-default-rtdb.firebaseio.com",
    projectId: "dt-simple-test",
    storageBucket: "dt-simple-test.appspot.com",
    messagingSenderId: "300734407042",
    appId: "1:300734407042:web:7e424ce4dcf83802fcef9b",
    measurementId: "G-0VRLED0SE3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.performance();
// End | Step 1 - Initialize

// Start | Step 2 - Auth
var auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
  if (!user && window.location.href.indexOf("login.html") <= 0 ) {
      window.location.href = "login.html";
  }
});
// End | Step 2 - Auth

// Start | Step 3 - Firestore
// Firestore tanımlama
firestore = firebase.firestore();
// End | Step 3 - Firestore

// Start | Step 4 - Remote Config
const remoteConfig = firebase.remoteConfig();
remoteConfig.settings.minimumFetchIntervalMillis = 1;

remoteConfig.fetchAndActivate()
.then(() => {
    var logo_color = remoteConfig.getValue("logo_color")._value;
    //Remote Config ayarlarının uygulanması
    $("#logo_2").css("color", logo_color);
})
.catch((err) => {
    console.log(err);
});
// End | Step 4 - Remote Config