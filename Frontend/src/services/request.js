import axios from 'axios'
import Cookies from 'js-cookie'
const accessToken = Cookies.get("token");
export const authRequest = axios.create({
    // baseURL : 'http://103.56.162.78:8000/i1/auth',
   baseURL :'http://localhost:8000',
    headers : {
        withCredentials: true,
        headers: { "Access-Control-Allow-Credentials": true ,
      },
    }
});

export const request = axios.create({
    // baseURL: "http://103.56.162.78:8000/td1/list",
    baseURL: 'http://localhost:8000',    
    headers: {
      token: `Bearer ${accessToken}`,
    },
});

