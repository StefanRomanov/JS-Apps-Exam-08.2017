handlers.home = function(ctx){
    ctx.loggedIn = auth.isLoggedIn();
    ctx.user = localStorage.username;

    ctx.loadPartials(
        auth.basePartials()
    ).then(function(){
        this.partial('templates/home.hbs')
    })
};