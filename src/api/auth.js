import { publicApi, securedApi } from './config';
// import { Buffer } from 'buffer';

const authControllers = {
    login: async (data) => {
        try {
            let result = await publicApi.post(`/api/verify-otp`, data);
            return result;
        } catch (error) {
            throw error;
        }
    },
    sendOTP: async(data)=>{
        try {
            // let { email, password } = data;
            // let body = Buffer.from(`${email}:${password}`, 'utf-8').toString('base64');
            let result = await publicApi.post(`/api/send-otp-admin`, data,  );
            return result;
        } catch (error) {
            throw error;
        }
    },

    logout: async (data) => {
        try {
            let result = await securedApi.post('/api/logout');
            return result;
        } catch (error) {
            throw error;
        }
    },

};

export default authControllers;