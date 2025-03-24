<template>
  <div class="login_container--outer">
    <div class="background_container--image">
      <h2>数字引领办赛</h2>
      <p class="asg__text--primary">—— 第五人格ASG赛事 ——</p>
      <p class="copyright__text--primary">©CopyRight 2024 - 2025 Avengers Gameing</p>
      <div class="zhanwei"></div>
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="login_form--wrap">
      <n-form ref="formRef" :model="model" :rules="rules">
        <h2>ASG后台桌面应用</h2>
        <n-form-item path="userName" label="用户名">
          <n-input :disabled="loading" v-model:value="model.userName" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input :disabled="loading" v-model:value="model.password" type="password" show-password-on="click" placeholder="请输入密码" />
        </n-form-item>
        <div style="display: flex; justify-content:center">
          <n-button type="primary" block strong :disabled="loading" @click="handleLogin">
            <span>登录</span><span v-show="loading" style="margin-left:1rem"> <n-spin stroke="#fff" :size="12" /></span>
          </n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { loginApi,getUserInfo } from '@/api/modules/login';
import { setToken } from '@/api/auth';
import { useUserStore } from '@/stores/user';
import { useMessage } from 'naive-ui';
import type { FormInst } from 'naive-ui';
const userStore = useUserStore();
const router = useRouter();
const model = reactive({
  userName: '',
  password: '',
});
const loading = ref(false);
const rules = {
  userName: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }
}
const formRef = ref<FormInst | null>(null)
const message = useMessage();
const handleLogin = () => {
  loading.value = true;
  formRef.value?.validate((errors) => {
    if (!errors) {
      loginRequest();
    }
    else {
      message.error('请输入账号和密码！');
      loading.value = false;
    }
  })
}
async function loginRequest() {
  try {
    const res: any = await loginApi(model);
    setToken(res);
    const userInfo:UserInfo = await getUserInfo() as UserInfo;
    userStore.setUserInfos(userInfo);
    message.success('登录成功！');
    router.push('/home');
  } catch (error: any) {
    message.error(error.message ? error.message : error)
  } finally {
    loading.value = false;
  }
}
</script>
<style scoped lang="scss">
// 外壳容器
.login_container--outer {
  height: 100vh;
  width: 100vw;
  background: rgb(255, 255, 255);
  overflow: hidden;
  display: grid;
  grid-template-columns: 45% 55%;

  .background_container--image {
    width: 100%;
    background: url('../../assets/images/login_bg.jpg');
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      position: absolute;
      color: #fff;
      z-index: 2;
      font-size: 2vw;
      top: 45%;
    }

    .asg__text--primary {
      position: absolute;
      font-size: 1vw;
      z-index: 2;
      top: 51%;
      color: #fff;
    }

    .copyright__text--primary {
      position: absolute;
      z-index: 2;
      bottom: 1rem;
      color: #fff;
      font-size: 14px;
    }

    .zhanwei {
      position: absolute;
      background-image: linear-gradient(180deg, #4f46e5, #3b82f6);
      opacity: 0.75;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 0;
    }

    .circles li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.2);
      animation: animate 25s linear infinite;
      bottom: -150px;
    }

    .circles li:nth-child(1) {
      left: 25%;
      width: 80px;
      height: 80px;
      animation-delay: 0s;
    }

    .circles li:nth-child(2) {
      left: 10%;
      width: 20px;
      height: 20px;
      animation-delay: 2s;
      animation-duration: 12s;
    }

    .circles li:nth-child(3) {
      left: 70%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
    }

    .circles li:nth-child(4) {
      left: 40%;
      width: 60px;
      height: 60px;
      animation-delay: 0s;
      animation-duration: 18s;
    }

    .circles li:nth-child(5) {
      left: 65%;
      width: 20px;
      height: 20px;
      animation-delay: 0s;
    }

    .circles li:nth-child(6) {
      left: 75%;
      width: 35px;
      height: 35px;
      animation-delay: 3s;
    }

    .circles li:nth-child(7) {
      left: 35%;
      width: 80px;
      height: 80px;
      animation-delay: 7s;
    }

    .circles li:nth-child(8) {
      left: 50%;
      width: 25px;
      height: 25px;
      animation-delay: 15s;
      animation-duration: 45s;
    }

    .circles li:nth-child(9) {
      left: 20%;
      width: 15px;
      height: 15px;
      animation-delay: 2s;
      animation-duration: 35s;
    }

    .circles li:nth-child(10) {
      left: 66%;
      width: 99px;
      height: 99px;
      animation-delay: 0s;
      animation-duration: 11s;
    }

    @keyframes animate {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
      }

      100% {
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
      }
    }
  }

  .login_form--wrap {
    width: 370px;
    padding: 2rem 0 4rem;
    background: #fff;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    h2 {
      text-align: center;
      margin: 1rem 0;
      background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>