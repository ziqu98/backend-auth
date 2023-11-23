require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('./users');

const getUsers = (request, h) => {
    return users;
};

const postUser = async (request, h) => {

    try {
        const { name, username, password } = request.payload;
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = {
            name: name,
            username: username,
            password: hashedPassword
        };

        users.push(user);

        const response = h.response({
            status: 'success',
            message: 'User Created',
        });

        response.code(201);
        return response;
    } 
    catch {
        const response = h.response({
            status: 'fail',
            message: 'Failed to Create User',
        });

        response.code(500);
        return response;
    }
};

const userLogin = async (request, h) => {

    const { username, password } = request.payload;
    const user = users.find(user => user.username === username)
    
    if (user == null) {

        const response = h.response({
            message: 'User Not Found',
        });

        response.code(400);
        return response;
    }
    try {
        if (await bcrypt.compare(password, user.password)) {

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

            const response = h.response({
                message: 'Success',
                data: {
                    accessToken: accessToken,
                }
            });

            return response;
        } 
        else {

            const response = h.response({
                message: 'Not Allowed',
            });

            return response;
        }
    } catch {

        const response = h.response({
            status: 'fail',
            message: 'Failed to Fetch User',
        });

        response.code(500);
        return response;
    }
};

const getRoute = (request, h) => {

};

const sendRoute = (request, h) => {

};

module.exports = {
    getUsers,
    postUser,
    userLogin,
    getRoute,
    sendRoute
};