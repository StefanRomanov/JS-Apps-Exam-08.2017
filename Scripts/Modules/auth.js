let auth = (() => {
    function isLoggedIn(){
        return localStorage.authtoken !== undefined;
    }

    function basePartials(){
        return {
            header: 'templates/common/header.hbs',
            footer: 'templates/common/footer.hbs',
            navbar: 'templates/common/navbar.hbs'
        }
    }

    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        localStorage.setItem('authtoken', userAuth);

        let userId = userInfo._id;
        localStorage.setItem('userId', userId);

        let username = userInfo.username;
        localStorage.setItem('username', username);
    }

    function login(username,password){
        let userData = {
            username,
            password
        };

        return requester.post('user', 'login', 'basic', userData);
    }

    function register(username,password){
        let userData = {
            username,
            password
        };

        return requester.post('user','','basic', userData);
    }

    function logout() {
        let data = {
            authtoken: localStorage.getItem('authtoken')
        };

        return requester.post('user', '_logout', 'kinvey', data)
    }

    function showError(message){
        let errorBox = $('#errorBox');
        errorBox.empty();
        errorBox.append($(`<span>${message}</span>`));
        errorBox.show();
        setTimeout(() => errorBox.fadeOut(), 2000);
    }

    function showInfo(message){
        let infoBox = $('#infoBox');
        infoBox.empty();
        infoBox.append($(`<span>${message}</span>`))
        infoBox.show();
        setTimeout(() => infoBox.fadeOut(), 2000);
    }

    function handleError(reason){
        showError(reason.responseJSON.description);
    }

    return {
        login,
        register,
        logout,
        saveSession,
        showInfo,
        showError,
        handleError,
        isLoggedIn,
        basePartials
    }

})();