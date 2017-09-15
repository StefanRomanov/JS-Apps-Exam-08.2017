handlers.submit = function (ctx){
    ctx.loggedIn = auth.isLoggedIn();
    ctx.user = localStorage.username;

    ctx.loadPartials(auth.basePartials())
        .then(function(){
            this.partial('templates/submit.hbs')
        })
};

handlers.submitPost = function (ctx){
    let submitForm = $('#submitForm');
    let url = submitForm.find('input[name=url]').val();
    let title = submitForm.find('input[name=title]').val();
    let imageLink = submitForm.find('input[name=image]').val();
    let description = submitForm.find('textarea[name=comment]').val();
    let author = localStorage.username;

    if(url === "" || title === ""){
        auth.showInfo('Title and url are required !');
        return
    }
    if(!/^http.+/g.test(url)){
        auth.showError('Links should start with "http"');
        return;
    }

    let post = {
        author,
        url,
        title,
        imageLink,
        description
    };

    operations.addPost(post).then(function(){
        auth.showInfo('Post created');
        ctx.redirect('#/catalog');
    }).catch(auth.handleError);

};

handlers.addComment = function(ctx){
    let postId = ctx.params.postId.substring(1);

    let content = $('#commentForm').find('textarea').val();

    let comment = {
        postId,
        content,
        author: localStorage.username
    }

    operations.addComments(comment).then(function(){
        auth.showInfo('Comment added');
        ctx.redirect(`#/details/:${postId}`);
    }).catch(auth.handleError);

};