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
    case `welcomeScreen`:
      document.getElementById(`app`).innerHTML = components.welcomeScreen;
      document.getElementById(`welcome-user`).innerText = `Welcome`+ ` `+ model.currentUser.displayName;
      break;
  }
};
view.setErrosMessage = (elemntId, message) => {
  document.getElementById(elemntId).innerText = message;
};
