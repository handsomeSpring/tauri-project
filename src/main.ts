import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index";
import '@/assets/styles/index.scss';
import pinia from "@/stores/index";
import naive from 'naive-ui';
import preNextButton from "@/views/extractThing/preNextButton.vue";
import DataVVue3 from '@kjgl77/datav-vue3'

const app = createApp(App);
app.use(router);
app.use(naive);
app.use(pinia);
app.use(DataVVue3);
app.component('preNextButton', preNextButton);
app.mount("#app");