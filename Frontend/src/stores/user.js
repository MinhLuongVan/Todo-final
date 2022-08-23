import {defineStore} from 'pinia'
import { useTodosStore } from './todo'
import {
    requestGetAllUsers,
    requestDeleteUser
  } from '../services/userServices'
  

export const useAuthorStore = defineStore ({
    id: 'user',
    state:() => ({
        users :[]
    }),
    getters: {
        getUser :(state) =>{
            const todoStore = useTodosStore();
            return state.users.find((user) => user.id === todoStore.todo.owner)
        }
    },
    actions : {
        async getAllUsers() {
            try {
               
                const res = await requestGetAllUsers();
                this.users = res.data.user;
                console.log('res', res.data.user);
                
              } catch (error) {
                console.log(error);
              }
        },
        async getIdDelete() {
            try {
                const res = await requestDeleteUser();
                this.users = res.data.users;
                console.log('id',res.data.users)
            } catch (error) {
                console.log(error)
                
            }
        } 
    }   
})
