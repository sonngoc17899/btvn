const components = {}
components.welcomeScreen = `
    <div>Welcome to ChartApp</div>
`
components.registerScreen = `
<div class="register-container">
<div class="register-form">
    <div class="title">Mindx chat</div>
    <form id="form-register">
        <div class="name-wrapper">
            <div class="input-wrapper">
                <input type="text" name="firstName" placeholder="First name...">
            <div class="erros" id="erros-first-name"></div>
            </div>
            <div class="input-wrapper">
                <input type="text" name="lastName" placeholder="Last name...">
                <div class="erros" id="erros-last-name"></div>
            </div>
        </div>
        <div class="input-wrapper">
            <input type="text" name="email" placeholder="Email..">
            <div class="erros" id="erros-email-name"></div>
        </div>
        <div class="input-wrapper">
            <input type="password" name="password" placeholder="Password..">
            <div class="erros" id="erros-password-name"></div>
        </div>
        <div class="input-wrapper">
            <input type="password" name="confirmPassword" placeholder="Confirm password..">
            <div class="erros" id="erros-confirm-password"></div>
        </div>
        <div class="submit-wrapper">
            <div>Already have an account?<span class="cursor-pointer" id="redirect-to-login">Login</span></div>
            <button class="btn" type="submit">register</button>
        </div>
    </form>
</div>
</div>
`
components.loginScreen =  `
<div class="login-container">
        <div class="login-form">
            <div class="login-title">Mindx Chat</div>
            <form id="form-register">
                <div class="input-wrapper">
                    <input type="text" name="email" placeholder="Email">
                    <div class="erros" id="erros-email-name"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" name="password" placeholder="Password">
                    <div class="erros" id="erros-password-name"></div>
                </div>
                <div class="submit-wrapper">
                    <div>Don't have an account?<span class="cursor-pointer" id="redirect-to-register">Register</span></div>
                    <button class="btn" type="submit">login</button>
                </div>
            </form>
        </div>
</div>`