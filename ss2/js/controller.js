const controller = {}
controller.register = (registerInfo) =>{
    if(registerInfo.firstName === ``){
        document.getElementById(`erros-first-name`).innerText = `Please input first name`;
    }
    if(registerInfo.email === ``){
        document.getElementById(`erros-email-name`).innerText = `Please input email`;
    }
    if(registerInfo.password === ``){
        document.getElementById(`erros-password-name`).innerText = `Please ipout password`;
    }
    if(registerInfo.confirmPassword === `` || registerInfo.password !== registerInfo.confirmPassword){
        document.getElementById(`erros-confirm-password`).innerText = `Please input confirm password or password confirm incorrect`;
    }
    if(registerInfo.lastName === ``){
        document.getElementById(`erros-last-name`).innerText = `Please input last name`;
    }
    if(
    registerInfo.firstName !== ``
    && registerInfo.email !== ``
    && registerInfo.password !== ``
    && registerInfo.confirmPassword !== ``
    && registerInfo.lastName !== ``
    && registerInfo.password === registerInfo.confirmPassword){
    view.setActiveScreen(`loginScreen`);
    }   
}
controller.login = (loginInfo) =>{
    if(loginInfo.email === ``){
        document.getElementById(`erros-email-name`).innerText = `Please input email`;
    }
    if(loginInfo.password === ``){
        document.getElementById(`erros-password-name`).innerText = `Please input password`;
    }
    if(loginInfo.email !== `` && loginInfo.password !== ``) view.setActiveScreen(`welcomeScreen`);
}