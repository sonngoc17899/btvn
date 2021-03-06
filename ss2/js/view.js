const view = {};
view.setActiveScreen = (screenName) => {
  switch (screenName) {
    case `registerScreen`:
      document.getElementById(`app`).innerHTML = components.registerScreen;
      const registerForm = document.getElementById(`form-register`);
      registerForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        const registerInfo = {
          firstName: registerForm.firstName.value,
          lastName: registerForm.lastName.value,
          email: registerForm.email.value,
          password: registerForm.password.value,
          confirmPassword: registerForm.confirmPassword.value,
        };
        controller.register(registerInfo);
      });
      const registerLogin = document.getElementById(`redirect-to-login`);
      registerLogin.addEventListener(`click`, (e) => {
        view.setActiveScreen(`loginScreen`);
      });
      break;
    case `loginScreen`:
      document.getElementById(`app`).innerHTML = components.loginScreen;
      const loginForm = document.getElementById(`form-register`);
      loginForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        const loginInfo = {
          email: loginForm.email.value,
          password: loginForm.password.value,
        };
        controller.login(loginInfo);
      });
      const loginRegister = document.getElementById(`redirect-to-register`);
      loginRegister.addEventListener(`click`, (e) => {
        view.setActiveScreen(`registerScreen`);
      });
      break;
    case `chatScreen`:
      document.getElementById(`app`).innerHTML = components.chatScreen;
      const sendMessageForm = document.querySelector(`#sendMessageForm`);
      sendMessageForm.addEventListener(`submit`, (e) =>{
        e.preventDefault();
        const message = {
          owner: model.currentUser.email,
          content: sendMessageForm.message.value,
          createdAt: new Date().toISOString()
        }
        if(sendMessageForm.message.value.trim() !== ``){
          model.addMessage(message);
      }
      sendMessageForm.message.value = ``;
      })
       document.getElementById(`new-conversation`).addEventListener(`click`, ()=>{
       view.setActiveScreen(`createConversationScreen`);
     })
      const addUsersForm = document.querySelector(`#addUser`);
      addUsersForm.addEventListener(`submit`, (e)=>{
        e.preventDefault();
        controller.addUser(addUsersForm.email.value);
        addUsersForm.email.value = ``;
      })
      document.querySelector(`#addUser input`).addEventListener(`click`, ()=>{
        document.getElementById(model.currentConversation.id).lastElementChild.style = `display: none`;
      })
      model.loadConversations();
      model.listenConversationsChange();
      break;
    case `createConversationScreen`:
      document.getElementById(`app`).innerHTML = components.createConversationScreen;
      document.getElementById(`back-to-chat`).addEventListener(`click`, () =>{
        view.backToChatScreen();
      })
      const createConversationForm = document.getElementById(`create-conversation-form`);
      createConversationForm.addEventListener(`submit`, (e) => {
        e.preventDefault();
        const data = {
          title: createConversationForm.title.value,
          friendEmail: createConversationForm.email.value
        }
        controller.createConversation(data);
      })
      break;
  }
};
view.backToChatScreen = () =>{
  document.getElementById(`app`).innerHTML = components.chatScreen;
  const sendMessageForm = document.querySelector(`#sendMessageForm`);
  sendMessageForm.addEventListener(`submit`, (e) =>{
    e.preventDefault();
    const message = {
      owner: model.currentUser.email,
      content: sendMessageForm.message.value,
      createdAt: new Date().toISOString()
    }
    if(sendMessageForm.message.value.trim() !== ``){
      model.addMessage(message);
  }
  sendMessageForm.message.value = ``;
  })
  document.getElementById(`new-conversation`).addEventListener(`click`, ()=>{
    view.setActiveScreen(`createConversationScreen`);
  })
 const addUsersForm = document.querySelector(`#addUser`);
 addUsersForm.addEventListener(`submit`, (e)=>{
  e.preventDefault();
  controller.addUser(addUsersForm.email.value);
  addUsersForm.email.value = ``;
})
document.querySelector(`#addUser input`).addEventListener(`click`, ()=>{
  document.getElementById(model.currentConversation.id).lastElementChild.style = `display: none`;
})
view.showConversation();
view.showCurrentConversation();
}
view.setErrosMessage = (elementId, message) => {
  document.getElementById(elementId).innerText = message;
};
view.addMessage = (message) => {
  const messageWrapper = document.createElement(`div`);
  messageWrapper.classList.add(`message`);
  if(model.currentUser.email === message.owner){
    messageWrapper.classList.add(`mine`);
    messageWrapper.innerHTML = `<div class="content">${message.content}</div>`
  }else{
    messageWrapper.classList.add(`their`);
    messageWrapper.innerHTML = `<div class="owner">${message.owner}</div>
    <div class="content">${message.content}</div>`
  }
  const listMessage = document.querySelector(`.list-message`);
  document.querySelector(`.list-message`).appendChild(messageWrapper);
  listMessage.scrollTop = listMessage.scrollHeight;
}
view.showCurrentConversation = () =>{
  document.querySelector('.list-message').innerHTML = '';
  for(let oneMessage of model.currentConversation.messages)
  {
    view.addMessage(oneMessage);
  }
  view.showUser();
  view.showTitle(model.currentConversation.title);
}
view.showConversation = () =>{
  // document.getElementById(`.list-conversations`).querySelector(`div`) = ``;
  for(oneConversation of model.conversations){
    view.addConversations(oneConversation);
  }
}
view.addConversations = (conversation) =>{
  const conversationWrapper = document.createElement('div');
  const newConversation = document.getElementById(`new-conversation`);
  conversationWrapper.classList.add('conversation');
  conversationWrapper.id = conversation.id;
  if(conversation.id === model.currentConversation.id)
  {
    conversationWrapper.classList.add('current')
  }
  conversationWrapper.innerHTML = `
  <div class="conversation-title">${conversation.title}</div>
  <div class="conversation-num-users">${conversation.users.length} users</div>
  <div class="conversation-notify"></div>
  `
  const mediaQuery = window.matchMedia(`screen and (max-width: 768px)`);
  if(mediaQuery.matches){
    conversationWrapper.firstElementChild.innerText = conversation.title.charAt(0);
    newConversation.innerHTML = `+`;
  }
  mediaQuery.addListener((mediaMatch) =>{
    if(mediaMatch.matches){
      conversationWrapper.firstElementChild.innerText = conversation.title.charAt(0);
      newConversation.innerHTML = `+`;
    }
    else {
          conversationWrapper.firstElementChild.innerText = conversation.title;
          newConversation.innerHTML = `+ New conversation`;
    }
  })
  conversationWrapper.addEventListener(`click`, ()=>{
    document.querySelector(`.current`).classList.remove(`current`);
    conversationWrapper.classList.add(`current`);
    model.changeCurrentConversation(conversation.id);
    conversationWrapper.lastElementChild.style = `display: none`;
  })
  document.querySelector(`.list-conversations`).appendChild(conversationWrapper);
}
view.showTitle = (title) =>{
  document.getElementById(`conversation-title`).innerText = ``;
  document.getElementById(`conversation-title`).innerText = `${title}`;
}
view.addUsers = (user) =>{
  const userWrapper = document.createElement(`div`);
  userWrapper.classList.add(`user`);
  userWrapper.innerHTML = user;
  document.querySelector(`.list-users`).appendChild(userWrapper);
}
view.showUser = () =>{
document.querySelector(`.list-users`).innerHTML = ``;
for(user of model.currentConversation.users)
  {
  view.addUsers(user);
  }
}
view.showNotify = (conversationId) =>{
  const conversation = document.getElementById(conversationId);
  conversation.lastElementChild.style = `display: block`;
}


