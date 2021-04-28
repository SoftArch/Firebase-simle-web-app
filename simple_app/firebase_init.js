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

var auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
  if (!user && window.location.href.indexOf("login.html") <= 0 ) {
      window.location.href = "login.html";
  }
});

// Firestore tanımlama
firestore = firebase.firestore();

const remoteConfig = firebase.remoteConfig();
remoteConfig.settings.minimumFetchIntervalMillis = 1;
var logo_color ="";

remoteConfig.fetchAndActivate()
.then(() => {
    logo_color = remoteConfig.getValue("logo_color")._value;
    //Remote Config ayarlarının uygulanması
    $("#logo_2").css("color", logo_color);
})
.catch((err) => {
    console.log(err);
});