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
model.loadConversations = () => {
    firebase.firestore().collection(model.collectionName).where('users','array-contains', model.currentUser.email).get().then(res => {
      const data = utils.getDataFromDocs(res.docs)
      if (data.length > 0) {
        model.currentConversation = data[0]
        view.showCurrentConversation()
      }
      console.log(data)
    })
  }
  model.addMessage = (message) => {
    const dataToUpdate = {
      messages: firebase.firestore.FieldValue.arrayUnion(message),
    }
    firebase.firestore()
    .collection(model.collectionName)
    .doc(model.currentConversation.id)
    .update(dataToUpdate)
  }
  model.listenConversationsChange = () => {
    firebase.firestore().collection(model.collectionName)
    .where('users','array-contains', model.currentUser.email)
    .onSnapshot((res) => {
        // if(!firstRun){

        // }
      const docChanges = res.docChanges()
      console.log(res)
      for(oneChange of docChanges){
          const type = oneChange.type;
          const oneChangeData = utils.getDataFromDoc(oneChange.doc)
          console.log(oneChangeData);
          if(oneChangeData.id === model.currentConversation.id){
              view.addMessage(oneChangeData.messages[oneChangeData.messages.length -1]);
          }
      }
    })
  }