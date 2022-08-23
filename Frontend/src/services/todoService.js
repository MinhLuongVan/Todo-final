 import { request } from "./request";
export const requestGetToDoByPage = async (page) => {
    return await request.get(`td1/list/page?limit=5&page=${page}`);
};

export const requestAddToDo = async (addToDo) => {
    return await request.post('td1/list/todo',addToDo);
};

export const requestUpdateToDo = async (todoUpdate) => {
    // return await request.put(`/${updateTodo._id}`,  
    // updateTodo);
    return await request.put(`td1/list/${todoUpdate._id}`,  
    todoUpdate);
};

export const requestFindToDoUpdate = async (id) => {
    return await request.get(`td1/list/${id}`);
};

export const requestDeleteToDo = async (id) => {
    return await request.delete(`td1/list/${id}`);
};
export const requestDeleteAllToDo = async () => {
    return await request.delete('td1/list/');
};

