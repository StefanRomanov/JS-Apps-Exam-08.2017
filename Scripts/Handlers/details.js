handlers.details = function(ctx){
    let postId = ctx.params.id.substring(1);
    ctx.loggedIn = auth.isLoggedIn();
    ctx.user = localStorage.username;

    let getPost = operations.getCurrentPost(postId);
    let getComments = operations.getComments(postId);

    Promise.all([getPost,getComments]).then(function([post,comments]){
        let transformedPost = post;
        if(transformedPost.description === undefined){
            transformedPost.description = "No description in it’s place."
        }
        ctx.date = operations.calcTime(post._kmd.lmt);
        ctx.description = transformedPost.description;
        ctx.url = post.url;
        ctx.imageUrl = post.imageUrl;
        ctx.author = post.author;
        ctx.title = post.title;
        ctx.isAuthor = post.author === localStorage.username;
        ctx._id = post._id;

        let comms = comments;

        comms.forEach(function(e){
            e.date = operations.calcTime(e._kmd.lmt);
            e.isAuthor = e.author === localStorage.username;
        });

        ctx.comments = comms;

        let partials = auth.basePartials();
        partials.comment = 'templates/comment.hbs';

        ctx.loadPartials(partials).then(function(){
            this.partial('templates/details.hbs');
        })


    }).catch(auth.handleError);
};