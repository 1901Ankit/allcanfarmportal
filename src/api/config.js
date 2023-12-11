const { default: axios } = require('axios');
const { useDispatch } = require('react-redux');
const { logout } = require('../redux/reducer/user');
const { default: store } = require('../redux/store');
// const serverUrl = "http://andriod.allcanfarm.com:8000";
const serverUrl = "http://18.140.237.109:8000";
// const serverPort = process.env.REACT_APP_SERVER_PORT;

const securedApi = axios.create
// ({baseURL:"http://andriod.allcanfarm.com:8000"});
({baseURL:"http://18.140.237.109:8000"});

securedApi.interceptors.request.use((config) => {
    const login_token = localStorage.getItem("access_token");
    config.headers.Authorization = `Bearer ${login_token}`;
    return config;
});

securedApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if (expiredToken(error)) {
            store.dispatch(logout());
        }
        throw error;
    }
);
// let data = axios.create({baseURL:"http://andriod.allcanfarm.com:8000"})

const publicApi = axios.create
// ({baseURL:"http://andriod.allcanfarm.com:8000"});
({baseURL:"http://18.140.237.109:8000"});

const expiredToken = (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            return true;
        }
    } else {
        return false;
    }
};
const forbiddenError = (error) => {
    if (error.response) {
        if (error.response.status === 403) {
            return true;
        }
    } else {
        return false;
    }
};

module.exports = { publicApi, securedApi, expiredToken, forbiddenError };