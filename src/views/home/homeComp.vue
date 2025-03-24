<template>
    <n-layout>
        <Transition name="slide-fade">
            <n-layout-header v-show="isCollapse">
                <div class="userinfo__main--part">
                    <n-avatar round size="medium" :src="userInfo.base64" @click="handleLogout" />
                    <h2>欢迎！{{ userInfo.chinaname || '未设置中文名' }}</h2>
                    <n-tag type="error" size="small" v-for="(item,index) in userRoles" :key="index">
                        {{ item }}
                    </n-tag>
                </div>
                <div class="menu__nav--container">
                    <div class="nav__item" :class="activeMenu === 'home' ? 'active' : ''"
                        @click="handleMenuClick('home')">
                        首页</div>
                    <div class="nav__item" :class="activeMenu === 'extract' ? 'active' : ''"
                        @click="handleMenuClick('extract')">抽签</div>
                    <div class="nav__item" :class="activeMenu === 'data' ? 'active' : ''"
                        @click="handleMenuClick('data')">
                        数据</div>
                    <div class="nav__item" :class="activeMenu === 'other' ? 'active' : ''"
                        @click="handleMenuClick('other')">其他</div>
                </div>
                <div class="icon__operatiion">
                    <n-icon size="20" @click="handleSwitchCollapse(false)">
                        <EyeOff />
                    </n-icon>
                </div>
            </n-layout-header>
        </Transition>
        <n-layout-content>
            <router-view></router-view>
        </n-layout-content>
        <n-float-button v-show="!isCollapse" position="fixed" right="40" top="10" style="z-index: 999;"
            @click="handleSwitchCollapse(true)">
            <n-icon>
                <Menu />
            </n-icon>
        </n-float-button>
    </n-layout>
</template>
<script setup lang="ts">
import { useDialog, useMessage } from 'naive-ui';
import { removeToken } from '@/api/auth';
import { EyeOff, Menu } from '@vicons/ionicons5'
import { useAppStore } from '@/stores/app';
import { useUserStore } from '@/stores/user';
import {
    storeToRefs
} from 'pinia'
const message = useMessage();
const dialog = useDialog();
const router = useRouter();
const appStore = useAppStore();
const userStore = useUserStore();
const { isCollapse } = storeToRefs(appStore);
const { userInfo } = storeToRefs(userStore);
const activeMenu = ref('home');

const userRoles = computed(()=>{
    let roleString = userInfo.value.roleListName as String | null;
    if(!roleString || typeof roleString !== 'string') return [];
    return roleString.split(',').slice(0, 2);
})
const handleSwitchCollapse = (isCol: boolean) => {
    appStore.setCollapse(isCol);
}
// 切换菜单
const handleMenuClick = (type: string) => {
    activeMenu.value = type;
    if (type === 'home') {
        router.push('/home');
        handleSwitchCollapse(false);
    } else {
        router.push(`/home/${type}`);
        handleSwitchCollapse(true);
    }
}
// 退出登录
const handleLogout = () => {
    dialog.warning({
        title: '警告',
        content: '你确定退出登录吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
            handleSwitchCollapse(false);
            removeToken();
            userStore.clearUserInfo();
            router.push('/');
            message.success('退出成功');
        },
    })
}
</script>
<style lang="scss" scoped>
.n-layout-header {
    height: 54px;
    border-bottom: 1px solid #dcdfe6;
    padding: 0 48px;
    display: grid;
    grid-template-columns: 50% auto 50px;
    cursor: pointer;
    position: fixed;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.6);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
}

.n-layout-content {
    height: 100vh;
    padding-top: 54px;
    background: #f1f1f1;
    background-size: cover;
    width: 100%;
    overflow-y: auto;
    background-image: url('../../assets/images/layout_bg.png');
}

.userinfo__main--part {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;

    h2 {
        font-size: 1.1rem;
        color: #303030;
    }
}

.menu__nav--container {
    height: 100%;
    display: flex;
    justify-content: flex-end;

    .nav__item {
        height: calc(100% - 2px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 12px;
        font-size: 14px;
        font-weight: 600;
        color: #303133;
        transition: color .3s;
        border-bottom: 3px solid transparent;

        &:hover {
            color: #4090EF;
        }

        &.active {
            border-color: #4090EF;
        }
    }
}

.icon__operatiion {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>
