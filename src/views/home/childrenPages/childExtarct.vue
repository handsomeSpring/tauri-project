<template>
  <div class="extract__step--list">
    <n-steps :current="current">
      <n-step title="抽签赛制选择" description="根据本场比赛的赛制选择抽签赛制。" />
      <n-step title="抽签模式选择" description="选择一种抽签模式" />
      <n-step title="设置抽签信息" description="设置各种各样的抽签信息。" />
      <n-step title="抽签展示" description="向观众展示抽签。" />
    </n-steps>
    <n-space style="margin-top: 1rem;">

      <n-radio-group v-model:value="current" size="medium" name="basic">
        <n-radio-button :value="1">
          第一步
        </n-radio-button>
        <n-radio-button :value="2" :disabled="stepTwoDis">
          第二步
        </n-radio-button>
        <n-radio-button :value="3" :disabled="stepThreeDis">
          第三步
        </n-radio-button>
        <n-radio-button :value="4" :disabled="stepFourDis">
          第四步
        </n-radio-button>
      </n-radio-group>
    </n-space>
  </div>
  <div class="component__container">
    <component :is="extractObject.component" :nowProcess="nowProcess" :extractObject="extractObject"
      :readOnly="current < nowProcess" @nextClick="handleNext" @preClick="handlePre">
    </component>
  </div>
</template>

<script setup lang='ts'>

import firstChoose from '@/views/extractThing/firstChoose.vue';
import type { Component } from 'vue';
import { getNextComponent } from '@/views/extractThing/hooks.ts';
// 激活步数的进度
const current = ref<number>(1);
// 目前已经进行了的进度
const nowProcess = ref<number>(1);
interface ExtractOptions {
  extractLabel: string | null //抽取标题
  extractNumber: number | null //抽取人数
  groupNumber: number | null //分组
}
interface ExtractObject {
  component: Component
  extractMode: null | string
  gameMode: null | string
  data: any[]
  options: ExtractOptions
  historyComponent: Component[]
}
const extractObject = reactive<ExtractObject>({
  component: firstChoose,
  extractMode: null,
  gameMode: null,
  data: [],
  options: {
    extractLabel: null,
    extractNumber: null,
    groupNumber: null
  },
  historyComponent: [firstChoose]
});
watch(current, ((newVal: number) => {
  extractObject.component = extractObject.historyComponent[newVal - 1];
}))
// 禁用条件
const stepTwoDis = computed(() => {
  return nowProcess.value < 2;
});
const stepThreeDis = computed(() => {
  return nowProcess.value < 3;
});
const stepFourDis = computed(() => {
  return nowProcess.value < 4;
});
const handleNext = (data: any, key: keyof ExtractObject) => {
  const nextComponent = getNextComponent(data, key);
  extractObject.component = nextComponent;
  extractObject.historyComponent.push(nextComponent);
  if (data instanceof Object && extractObject[key] instanceof Object) {
    Object.assign(extractObject[key], data)
  }else{
    extractObject[key] = data;
  }
  nowProcess.value++;
  current.value = nowProcess.value;
}
const handlePre = () => {
  extractObject.historyComponent.pop();
  nowProcess.value--;
  current.value = nowProcess.value;
}
</script>
<style scoped lang='scss'>
.extract__step--list {
  position: sticky;
  top: 0;
  background: #fff;
  padding: 2rem;
}

.component__container {
  padding: 2rem;
}
</style>