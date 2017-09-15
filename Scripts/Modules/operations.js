let operations = (() => {
    function getPosts(){
        return requester.get('appdata','posts','kinvey');
    }

    function calcTime(dateIsoFormat) {
        let diff = new Date - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);
        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
    }

    function getCurrentUserPosts(){
        let userId = localStorage.userId;
        return requester.get('appdata',`posts/?query={"_acl":{"creator":"${userId}"}}`,'kinvey');
    }

    function addPost(post){
        return requester.post('appdata','posts','kinvey',post);
    }

    function getPost(id){
        return requester.get('appdata',`posts/${id}`,'kinvey');
    }

    function editPost(data,id){
        return requester.update('appdata',`posts/${id}`,'kinvey',data);
    }

    function removePost(id){
        return requester.remove('appdata',`posts/${id}`, 'kinvey');
    }

    function getCurrentPost(id){
        return requester.get('appdata',`posts/${id}`,'kinvey');
    }

    function getComments(id){
        return requester.get('appdata', `comments/?query={"postId":"${id}"}`,'kinvey')
    }

    function addComments(data){
        return requester.post('appdata','comments','kinvey', data);
    }

    function removeComment(id){
        return requester.remove('appdata',`comments/${id}`,'kinvey');
    }


    return {
        getPosts,
        calcTime,
        getCurrentUserPosts,
        addPost,
        getPost,
        editPost,
        removePost,
        getCurrentPost,
        getComments,
        addComments,
        removeComment
    }

})();