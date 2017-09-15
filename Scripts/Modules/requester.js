let requester = (() => {
    const baseUrl = 'https://baas.kinvey.com/';

    //ADD YOUR KINVEY CREDENTIALS HERE !!
    const appKey = 'kid_H1fNwbDO-'; //Write Your App Key here
    const appSecret = 'fca9ee007a41428baa597602aa473642'; //Write Your App Secret here

    function makeAuth(type) {
        return type === 'basic'
        ? 'Basic ' + btoa(appKey + ':' + appSecret)
        : 'Kinvey ' + localStorage.getItem('authtoken');
    }

    function makeRequest(method, module, endpoint, auth){
        return req = {
            method,
            url: baseUrl + module + '/' + appKey + '/' + endpoint,
            headers: {
                'Authorization' : makeAuth(auth)
            }
        };
    }

    function get (module,endpoint,auth){
        return $.ajax(makeRequest('GET', module, endpoint, auth))
    }

    function post(module,endpoint, auth,data){
        let req = makeRequest('POST', module,endpoint,auth);
        req.data = data;
        return $.ajax(req);
    }

    function update (module,endpoint, auth, data){
        let req = (makeRequest('PUT', module, endpoint, auth));
        req.data = data;
        return $.ajax(req);
    }

    function remove (module, endpoint , auth){
        return $.ajax(makeRequest('DELETE', module, endpoint, auth));
    }

    return {
        get,
        post,
        update,
        remove
    };
})();