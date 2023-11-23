const { 
    getUsers,
    postUser,
    userLogin,
    getRoute,
    sendRoute
} = require('./handler')

const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: getUsers,
    },
    {
        method: 'POST',
        path: '/users',
        handler: postUser,
    },
    {
        method: 'POST',
        path: '/users/login',
        handler: userLogin,
    },
    {
        method: 'GET',
        path: '/route',
        handler: getRoute,
    },
    {
        method: 'POST',
        path: '/route/send',
        handler: sendRoute,
    },
];

module.exports = routes;