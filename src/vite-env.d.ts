/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// 声明引入文件
declare module '@tauri-apps/plugin-http';

// 通用类型
interface ResponseResult{
  status:string
  data:any
  message?:string
}
// 用户信息接口
interface UserInfo{
  base64:string | null
  chinaname:string | null
  email:string | null
  id:number
  isadmin:boolean
  money:number | null
  name:string
  qqnumber:string | null
  officium:string | null
  roleListCode:string | null
  roleListName:string | null
  roles:string[] | null
}
// 标准后端返回
interface symbolResponse{
  message:string
  code:number
  data:any
}
// 基本键值对
interface NorKeyValue{
  name:string
  value:string | number
}
// 抽签相关
interface ReturnValidator{
  flag:boolean,
  messageText:string
}