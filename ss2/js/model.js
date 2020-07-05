const model = {}
model.currentUser = undefined;
model.collectionName = `conversation`;
model.currentConverstaion = undefined;
model.register = (firstName, lastName, email, password) =>{
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
            view.setActiveScreen(`welcomeScreen`);
        }else alert(`Please verify your email`);
    }).catch((error) =>{}) 
}
model.loadConversations = () =>{
    firebase.firestore().collection(model.collectionName).get().then(res =>{
        const data = utils.getDataFromDocs(res.docs)
        if(data.length > 0){
            model.currentConversation = data[0];
            view.showCurrentConversation();        
        }
        console.log(data);
    })
    
}
model.updateMessages = (message)=>{
    const docIdUpdate = `GzdJCKM1QCdEPc8KFAXU`;
    const dataToUpDate = {
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    }    
    console.log(firebase.firestore.FieldValue.arrayUnion(message));
    
    // if(sendMessageForm.message.value.trim() !== ``){
        firebase.firestore().collection('conversation').doc(model.currentConversation.id).update(message).then(res => {
            alert('updated!')
        })
    // }
}