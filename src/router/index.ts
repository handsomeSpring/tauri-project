import { createMemoryHistory, createRouter } from 'vue-router';
import LoginComp from '@/views/login/index.vue';
import HomeComp from '@/views/home/homeComp.vue';
import childHome from '@/views/home/childrenPages/childHome.vue';
import childExtarct from '@/views/home/childrenPages/childExtarct.vue';
import childData from '@/views/home/childrenPages/childData.vue';
import childOther from '@/views/home/childrenPages/childOther.vue';
const routes = [
    { 
        path: '/', component: LoginComp 
    },
    {
        path: '/home',
        component: HomeComp,
        children:[
            {
                path:'',
                component:childHome
            },
            {
                path:'extract',
                component:childExtarct
            },
            {
                path:'data',
                component:childData
            },
            {
                path:'other',
                component:childOther
            }
        ]
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
export default router;