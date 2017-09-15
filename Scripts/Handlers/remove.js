handlers.remove = function(ctx){
    let postId = ctx.params.id.substring(1);

    operations.removePost(postId).then(function(){
        auth.showInfo('Post deleted');
        ctx.redirect('#/catalog')
    })

};

handlers.removeComment = function(ctx){
    let commentId = ctx.params.id.substring(1);
    let postId = $('#viewComments').find('div[class=post]').attr('postId');

    operations.removeComment(commentId).then(function(){
        auth.showInfo('Comment deleted');
        ctx.redirect(`#/details/:${postId}`)
    }).catch(auth.handleError)
}