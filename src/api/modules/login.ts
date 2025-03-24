import { request } from "@/api/request";

interface LoginForm {
    userName:string
    password:string
}
export function loginApi(loginForm:LoginForm){
    return request({
        url:'v1/login',
        method:'POST',
        data:loginForm
    });
}
// 获取用户信息
export function getUserInfo(){
    return request({
        url:'v1/user',
        method:"GET"
    })
}