handlers.register = function (ctx) {
    let registerForm = $('#registerForm');
    let password = registerForm.find('input[name=password]').val();
    let username = registerForm.find('input[name=username]').val();
    let repeatPass = registerForm.find('input[name=repeatPass]').val();

    if(username.length < 3){
        auth.showError('Username must be at least 3 characters long !');
        return;
    }
    if(password.length < 6 || repeatPass.length < 6){
        auth.showError('Password must be at least 6 characters long !');
        return;
    }
    if(password !== repeatPass){
        auth.showError('Passwords should match !');
        return;
    }

    auth.register(username,password).then(function(userInfo){
        auth.showInfo('Successfully registered !');
        ctx.redirect('#/home');
    }).catch(auth.handleError);
};