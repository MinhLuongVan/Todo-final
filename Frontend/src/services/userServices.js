import { request, authRequest } from "./request";

export const requestGetAllUsers = async () => {
    return await request.get('i1/user/');
};

export const requestAddUser = async (addUser) => {
    return await authRequest.post('i1/auth/register',addUser);
};

export const requestUpdateUser = async (updateUser) => {
    return await request.put(`i1/user/${updateUser._id}`,  
    updateUser);
};

export const requestFindUserUpdate = async (id) => {
    return await request.get(`i1/user/${id}`);
};

export const requestDeleteUser = async (userId) => {
    return await request.delete(`i1/user/${userId}`);
};
