import { authRequest } from "./request";

export const requestRegister = async (registerForm) => {
    return await authRequest.post('/i1/auth/register', registerForm);
};
export const requestLogin = async (loginForm) => {
    return await authRequest.post('/i1/auth/login',loginForm,{ withCredentials:true });
};


