const components = {}
components.chatScreen = `
<div class="header">
  MindX chat
</div>
<div class="chat-container">
<div class="aside-left">
  <div class="new-conversation">
    <button class="btn" id="new-conversation">+ New conversation</button>
  </div>
  <div class="list-conversations">
  </div>
</div>
<div class="main">
  <div class="conversation-detail">
    <div id="conversation-title">First conversation</div>
    <div class="list-message">
    </div>
    <form id="sendMessageForm">
      <input class="input" autocomplete="off" type="text" name="message" placeholder="Type a message...">
      <button class="btn"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
    </form>
</div>
</div>
<div class="aside-right">
    <div class="list-users"></div>
    <form id="add-email">
    <input class="input" autocomplete="off" type="text" placeholder="Email">
    <button class="btn" type="submit">Thêm</button>
    </form>
</div>
</div>
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
components.createConversationScreen = `
<div class="create-conversation-wrapper">
        <div class="header">
            <div class="title">Techkids Chat</div>
        </div>
        <div class="main">
        <h3 class="mb-1rem">Creat a new conversation</h3>
            <form id="create-conversation-form">
                <div class="input-wrapper">
                    <input type="text" name="title" placeholder="Conversation name">
                    <div class="erros" id="erros-conversationName"></div>
                </div>
                <div class="input-wrapper"> 
                    <input type="text" name="email" placeholder="Friend email">
                    <div class="erros" id="erros-friendEmail"></div>
                </div>
            <div class="button-wrapper">
                <button class="btn" type="submit">Save</button>
                <button type="button" id="back-to-chat">Cancel</button>
            </div>
            </form>
        </div>
</div>
`
