handlers.edit = function(ctx){
    let postId = ctx.params.id.substring(1);
    ctx.id = postId;

    operations.getPost(postId).then(function(data){

        ctx.loadPartials(auth.basePartials())

            .then(function(){
                this.partial('templates/edit.hbs')

                    .then(function(){
                        let editForm = $('#editPostForm');
                        editForm.find('input[name=url]').val(data.url);
                        editForm.find('input[name=title]').val(data.title);
                        editForm.find('input[name=image]').val(data.imageLink);
                        editForm.find('textarea[name=description]').val(data.description);
                    })
            }).catch(auth.handleError)
    })
};

handlers.editPost = function (ctx){
    let postId = ctx.params.id.substring(1);

    let editForm = $('#editPostForm');
    let url = editForm.find('input[name=url]').val();
    let title = editForm.find('input[name=title]').val();
    let imageLink = editForm.find('input[name=image]').val();
    let description = editForm.find('textarea').val();
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

    operations.editPost(post,postId).then(function(){
        auth.showInfo(`Post ${title} edited`);
        ctx.redirect('#/catalog');
    }).catch(auth.handleError)

};