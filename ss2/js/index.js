window.onload = () =>{
    var firebaseConfig = {
        apiKey: "AIzaSyDKiWR4rRqWy1yBGXZXSKC61CiJIKy4oAs",
        authDomain: "nohope-2-91a01.firebaseapp.com",
        databaseURL: "https://nohope-2-91a01.firebaseio.com",
        projectId: "nohope-2-91a01",
        storageBucket: "nohope-2-91a01.appspot.com",
        messagingSenderId: "1091638045087",
        appId: "1:1091638045087:web:ef4524930bf4c2fbc5f5aa",
        measurementId: "G-6QVJ7P8V9E"
      };
    firebase.initializeApp(firebaseConfig);
    // console.log(`Loaded`);
    // view.setActiveScreen(`chatScreen`); 
    // console.log(firebase.app().name);
    // view.setActiveScreen(`registerScreen`);
    // view.setActiveScreen(`loginScreen`);
    firebase.auth().onAuthStateChanged((user) => {
        // console.log(user)
        if(user) {
          if (user.emailVerified) {
            model.currentUser = {
              displayName: user.displayName,
              email: user.email
            }
            view.setActiveScreen('chatScreen')
          } else {
            view.setActiveScreen('loginScreen')
            alert('Please verify your email')
          }
        } else {
          view.setActiveScreen('loginScreen')
        }
      })
// templateQueryDataBase();
}

templateQueryDataBase = () =>{
    const docId = `oXUBNmhxyMNbyVG7AH31`;
    // get one
    // firebase.firestore().collection(`user`).doc(docId).get().then(res => {
    //     console.log(res.data());
    //     console.log(getDataFromDoc(res));
        
    // }).catch(err => {
    //     console.log(err);
    // })
    // get many
    // firebase.firestore().collection(`users`).where(`age`, `==`, 20).get().then(res => {
    //     console.log(getDataFromDocs(res.docs));
    // })
    // get creat
    const dataToCreate = {
        name: `Create`,
        age: `18`,
        email: `sonngoc1799@gmail.com`,
        phoneNumber: [`4230948203`]
    }
    // firebase.firestore().collection(`user`).add(dataToCreate).then(res =>{
    //     alert(`Added!`);
    // })
    // // get update
    // const docIdupdate = `tDWIQzsU8QXEYi4K6Sa9`;
    // const dataToUpdate = {
    //     age: 20,
    //     name: `Nguyen Van C`,
    //     address: `HN`,
    //     phones: [`02193102`],
    // }
    // firebase.firestore().collection(`users`).doc(docIdupdate).update(dataToUpdate).then(res =>{
    //     alert(`update`);
    // })
    // // get delete
    // const docIdDelete = `fTKjV2AqBsmMURxjNPng`;
    // firebase.firestore().collection(`users`).doc(docIdDelete).delete().then(res =>{

    // })
}
// getDataFromDoc = (doc) =>{
//     const data = doc.data();
//     data.id = doc.id;
//     return data;
// }
// getDataFromDocs = (docs) =>{
//     return docs.map(getDataFromDoc);
// }
