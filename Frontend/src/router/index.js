import { createRouter, createWebHistory } from "vue-router";
 //import {useAuthStore} from '../stores/auth'
import Login from "../views/Login/Login.vue";
import Register from "../views/Register/Register.vue";
import Listtodo from "../views/Todos/Listtodo.vue";
import Listuser from "../views/Users/Listuser.vue";
import Adduser from "../views/Users/Adduser.vue";
import Updateuser from "../views/Users/Updateuser.vue";

const routes = [
  {
    path: "/",
    component: Login,
    
  },
  {
    path: "/register",
    component: Register,
   
  },
  {
    path : "/todolist",
    component : Listtodo,
    // meta : {
    //   requiresAuth: true,
    // },
    // beforeEnter(to, from, next){
    //   if (to.matched.some((record) => record.meta.requiresAuth)) {
    //     const authStore = useAuthStore();
    //     if( authStore.isAuthenticated){
    //       next();
    //     }else{
    //       next('/');
    //     }
    //   }else {
    //   next();
    //   }
    // }
  },

   {
     path: "/user",
     component: Listuser,
   },
  {
    path: "/adduser",
    component: Adduser,
  },
  {
    path: "/edituser/:id",
    component: Updateuser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;


