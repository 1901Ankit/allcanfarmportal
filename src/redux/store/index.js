import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../reducer/modal';
import userReducer from '../reducer/user';

const localStorageMiddleware = ({ getState }) => {
    return (next) => (action) => {
        const result = next(action);
        localStorage.setItem('userState', JSON.stringify(getState().user));
        return result;
    };
};

const reHydrateStore = () => {
    // if (localStorage.getItem('userState') !== null) {
    //     return { user: JSON.parse(localStorage.getItem('userState')) };
    // }
};

export default configureStore({
    reducer: {
        modal: modalReducer,
        user: userReducer
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(localStorageMiddleware)
});
