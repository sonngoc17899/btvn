const model = {}
model.currentUser = undefined;
model.collectionName = `conversation`;
model.currentConverstaion = undefined;
model.conversations = undefined;
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
            view.setActiveScreen(`chatScreen`);
        }else alert(`Please verify your email`);
    }).catch((error) =>{}) 
}
model.loadConversations = () => {
    firebase.firestore().collection(model.collectionName).where('users','array-contains', model.currentUser.email).get().then(res => {
      const data = utils.getDataFromDocs(res.docs)
      model.conversations = data;
      if (data.length > 0) {
        model.currentConversation = data[0]
        view.showCurrentConversation();
      }
      view.showConversation()
      for(user of data[0].users)
      {
        view.addUsers(user);
      }
      view.showTitle(data[0].title);
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
  let isFistRun = false
  firebase.firestore().collection(model.collectionName)
  .where('users','array-contains', model.currentUser.email)
  .onSnapshot((res) => {
    if(!isFistRun) {
      isFistRun = true
      return
    }
    const docChanges = res.docChanges()
    console.log(docChanges)
    for(oneChange of docChanges) {
      const type = oneChange.type
      const oneChangeData = utils.getDataFromDoc(oneChange.doc)
      console.log(oneChangeData)
      if(type === 'modified') {
        if (oneChangeData.id === model.currentConversation.id) {
          model.currentConversation = oneChangeData
          view.addMessage(oneChangeData.messages[oneChangeData.messages.length - 1])
        }
        for(let i = 0; i < model.conversations.length; i++) {
          const element = model.conversations[i]
          if(element.id === oneChangeData.id){
            model.conversations[i] = oneChangeData
          }
        }
      } else if(type === 'added') {
        model.conversations.push(oneChangeData)  
        view.addConversations(oneChangeData)
      }
    }
  })
}
model.changeCurrentConversation = (conversationId) =>{
  document.querySelector(`.list-users`).innerHTML = ``;
  for(conversation of model.conversations) {
    if (conversation.id === conversationId) {
      model.currentConversation = conversation
      view.showCurrentConversation();
      view.showTitle(conversation.title);
    }
    for(let i=0;i<conversation.users.length;i++)
    {
      if (conversation.id === conversationId) {
        view.addUsers(conversation.users[i])
      }
    }
  }
  // model.currentConversation = conversation
  // .filter(item => item.id === conversationId)[0]
  // console.log(model.currentConversation);
  // view.showTitle(conversation.title);
  // view.showCurrentConversation();
}
model.createConversation = (conversation) =>{
  console.log(conversation);
  firebase.firestore().collection(model.collectionName).add(conversation);
  view.backToChatScreen();
}
