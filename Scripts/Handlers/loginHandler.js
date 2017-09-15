handlers.login = function(ctx){
    let loginForm = $('#loginForm');
    let password = loginForm.find('input[name=password]').val();
    let username = loginForm.find('input[name=username]').val();

    if(password === "" || username === ""){
        auth.showError('Both fields are required for login!');
        return;
    }

    auth.login(username,password).then(function(userInfo){
        auth.saveSession(userInfo);
        auth.showInfo('Login successful');
        ctx.redirect('#/catalog');
    }).catch(auth.handleError);
};