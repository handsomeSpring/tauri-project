import { defineStore } from "pinia"

export const useUserStore = defineStore('userStore', {
  // defineStore('userInfo',{})  userInfo就是这个仓库的名称name
  state: () => ({
    userInfo: {
      base64: null,
      chinaname: null,
      email: null,
      id: 0,
      isadmin: false,
      money: null,
      name: '',
      qqnumber: null,
      officium: null,
      roleListCode: null,
      roleListName: null,
      roles: null
    }
  }),
  actions: {
    setUserInfos(users: UserInfo) {
      Object.assign(this.userInfo, users);
    },
    clearUserInfo(){
      this.userInfo = {
        base64: null,
        chinaname: null,
        email: null,
        id: 0,
        isadmin: false,
        money: null,
        name: '',
        qqnumber: null,
        officium: null,
        roleListCode: null,
        roleListName: null,
        roles: null
      }
    }
  }
})