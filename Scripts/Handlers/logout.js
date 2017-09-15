handlers.logout = function(ctx){
    auth.logout().then(function(){
        localStorage.clear();
        auth.showInfo('Successful logout !');
        ctx.redirect('#/home')
    }).catch(auth.handleError);
};