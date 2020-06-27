const model = {}
model.register = (firstName, lastName, email, password) =>{
    model.currentUser = undefined;
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) =>{
        console.log(user);
        firebase.auth().currentUser.sendEmailVerification();
        firebase.auth().currentUser.updateProfile({
            displayName: firstName + `` + lastName
        })
        view.setActiveScreen(`loginScreen`);
        alert(`Register success`);
    }).catch((err) => {
        alert(err.message);
    })
}
model.login = (email, password) =>{
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) =>{
        console.log(user);
        if(user.user.emailVerified){
            model.currentUser = {
                displayName: user.user.displayName,
                email: user.user.email,
            }
            view.setActiveScreen(`welcomeScreen`);2
        }else alert(`Please verify your email`);
    }).catch((error) =>{}) 
}