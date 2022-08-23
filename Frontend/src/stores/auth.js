import { defineStore } from "pinia";
import Cookies from "js-cookie";
import {
    requestLogin,
    requestRegister } from '../services/authService'
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    currentUser: [],
    isAuthenticated: false,
   
  }),
  getters: {
    getMessageAuth: (state) => state.message,
    authenticate: (state) => state.isAuthenticated,
  },
  actions: {
    async loginUser(loginForm) {
      const res = await requestLogin(loginForm);
      console.log('1',res.data.isAdmin)
      if (res.data.success) {
        this.currentUser = res.data.data.user;
        this.isAuthenticated = true;
        Cookies.set('token', res.data.data.Token);
      
      } else if (!res.data.success) {
        (this.currentUser = []), (this.isAuthenticated = false);

      } else {
       console.log("login that bai")
      }
    },

    async registerUser(registerForm) {
      const res = await requestRegister(registerForm);
      this.currentUser = [];
      this.isAuthenticated = false;
     
    },
  },
})