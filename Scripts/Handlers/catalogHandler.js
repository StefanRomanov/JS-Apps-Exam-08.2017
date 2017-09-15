handlers.catalog = function(ctx) {

    ctx.loggedIn = auth.isLoggedIn();
    ctx.user = localStorage.username;

  operations.getPosts()
      .then(function(data){
          let posts = data;

          posts.forEach(function(e){
             e.date = operations.calcTime(e._kmd.lmt);
             e.number = posts.indexOf(e) + 1;
             e.isAuthor = e.author === localStorage.username;

          });

          ctx.posts = posts;

          let partials = auth.basePartials();
          partials.post = 'templates/post.hbs';
          ctx.loadPartials(partials).then(function(){
              this.partial('templates/catalog.hbs');
          })
      }).catch(auth.handleError)
};

handlers.myPosts = function(ctx){
    ctx.loggedIn = auth.isLoggedIn();
    ctx.user = localStorage.username;

    operations.getCurrentUserPosts()
        .then(function(data){
            let posts = data;

            posts.forEach(function(e){
                e.date = operations.calcTime(e._kmd.lmt);
                e.number = posts.indexOf(e) + 1;
                e.isAuthor = e.author === localStorage.username;
            });

            ctx.posts = posts;

            let partials = auth.basePartials();
            partials.post = 'templates/post.hbs';
            ctx.loadPartials(partials).then(function(){
                this.partial('templates/myPosts.hbs');
            })
        }).catch(auth.handleError)
};