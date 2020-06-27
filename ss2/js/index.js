window.onload = () =>{
    var firebaseConfig = {
        apiKey: "AIzaSyBeBaY2qhxlSo8eGMJhRemHfWQlArZWxk8",
        authDomain: "nohope-2.firebaseapp.com",
        databaseURL: "https://nohope-2.firebaseio.com",
        projectId: "nohope-2",
        storageBucket: "nohope-2.appspot.com",
        messagingSenderId: "686573350289",
        appId: "1:686573350289:web:4e7b93258c79bbb328fe30"
    };
    firebase.initializeApp(firebaseConfig);
    // console.log(`Loaded`);
    // view.setActiveScreen(`welcomeScreen`); 
    console.log(firebase.app().name);
    // view.setActiveScreen(`registerScreen`);
    // view.setActiveScreen(`loginScreen`);
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            model.currentUser = {
                displayName: user.displayName,
                email: user.email,
            }
            view.setActiveScreen(`welcomeScreen`);
        } else {
            alert(`Mời bạn đăng nhập`);
            view.setActiveScreen(`loginScreen`);
        }
    });
}