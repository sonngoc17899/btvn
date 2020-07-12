const controller = {};

controller.register = (registerInfo) => {
  if (registerInfo.firstName === ``) {
    view.setErrosMessage(`erros-first-name`, `Please input first name`);
  } else view.setErrosMessage(`erros-first-name`, ``);
  if (registerInfo.email === ``) {
    view.setErrosMessage(`erros-email-name`, `Please input email `);
  } else view.setErrosMessage(`erros-email-name`, ``);
  if (registerInfo.password === ``) {
    view.setErrosMessage(`erros-password-name`, `Plase input password`);
  } else view.setErrosMessage(`erros-password-name`, ``);
  if (
    registerInfo.confirmPassword === `` ||
    registerInfo.password !== registerInfo.confirmPassword
  ) {
    view.setErrosMessage(
      `erros-confirm-password`,
      `Please input confirm password`
    );
  } else view.setErrosMessage(`erros-confirm-password`, ``);
  if (registerInfo.lastName === ``) {
    view.setErrosMessage(`erros-last-name`, `Plese input last name`);
  } else view.setErrosMessage(`erros-last-name`, ``);
  if (
    registerInfo.firstName !== `` &&
    registerInfo.email !== `` &&
    registerInfo.password !== `` &&
    registerInfo.confirmPassword !== `` &&
    registerInfo.lastName !== `` &&
    registerInfo.password === registerInfo.confirmPassword
  ) {
      model.register(registerInfo.firstName, registerInfo.lastName, registerInfo.email, registerInfo.password);
    // view.setActiveScreen(`loginScreen`);
  }
};
controller.login = (loginInfo) => {
  if (loginInfo.email === ``) {
    view.setErrosMessage(`erros-email-name`, `Please input email`);
  } else view.setErrosMessage(`erros-email-name`, ``);
  if (loginInfo.password === ``) {
    view.setErrosMessage(`erros-password-name`, `Please input password`);
  } else view.setErrosMessage(`erros-password-name`, ``);
  model.login(loginInfo.email, loginInfo.password);
};
controller.createConversation = ({ title, friendEmail }) =>{
  view.setErrosMessage(`erros-conversationName`, title ===`` ? `Please input title` : ``)
  view.setErrosMessage(`erros-friendEmail`, friendEmail ===`` ? `Please input friend email` : ``);
  if(title !== `` && friendEmail !== ``){
    model.createConversation({
      title,
      users: [friendEmail, model.currentUser.email],
      creatAt: new Date().toISOString(),
      message: []
    })
  }
}