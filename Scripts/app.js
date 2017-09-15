const handlers = {};

$(() => {
    let app = Sammy('#container', function(){
        this.use('Handlebars', 'hbs');

        this.get('index.html',handlers.home);

        this.get('#/home',handlers.home);

        this.get('#/catalog',handlers.catalog);

        this.get('#/logout',handlers.logout);

        this.get('#/myPosts',handlers.myPosts);

        this.get('#/submit',handlers.submit);

        this.get('#/edit/:id',handlers.edit);

        this.get('#/delete/:id',handlers.remove);

        this.get('#/details/:id',handlers.details);

        this.get('#/deleteComment/:id',handlers.removeComment);

        this.post('#/comment/:postId',handlers.addComment);

        this.post('#/edit/:id',handlers.editPost);

        this.post('#/submit',handlers.submitPost);

        this.post('#/register',handlers.register);

        this.post('#/login',handlers.login);
    }).run();

    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').hide()
    });

});