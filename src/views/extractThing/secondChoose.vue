<!-- 第二步选择的是小组赛 -->
<template>
    <div class="choose__container">
        <div class="choose__item" :class="extractMode === 'Card' ? 'active' : ''" @click="handleClick('Card')">
            <p class="text_title">翻牌</p>
        </div>
        <div class="choose__item" :class="extractMode === 'Ballot' ? 'active' : ''" @click="handleClick('Ballot')">
            <p class="text_title">抽奖</p>
        </div>
    </div>
    <preNextButton v-if="!readOnly" :validateFunction="validator" :nowProcess="props.nowProcess"
        revokeWarningText="您确定返回到第一步重新选择赛制吗？" @nextClick="handleNext" @preClick="handlePre"></preNextButton>
</template>

<script setup lang='ts'>
const emits = defineEmits(['nextClick', 'preClick']);
const extractMode = ref<string | null>(null);
const props = defineProps({
    nowProcess: {
        type: Number,
        required: true
    },
    extractObject: {
        type: Object,
        required: true
    },
    readOnly: {
        type: Boolean,
        required: true
    }
});

const validator = (): ReturnValidator => {
    if (extractMode.value) {
        return {
            flag: true,
            messageText: 'ok'
        }
    } else {
        return {
            flag: false,
            messageText: '请选择抽签模式'
        }
    }
}
// 初始化
const init =()=>{
    extractMode.value = props.extractObject.extractMode;
}
init();

const handleClick = (type: string) => {
    if(props.readOnly) return;
    extractMode.value = type;
}
const resetData = () => {
    extractMode.value = null;
}
const handleNext = () => {
    emits('nextClick', extractMode.value, 'extractMode');
}
const handlePre = () => {
    resetData();
    emits('preClick');
}
</script>
<style scoped lang='scss'>
.choose__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    .choose__item {
        aspect-ratio: 16 / 7;
        width: 100%;
        border-radius: 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border: 2px solid transparent;
        background: linear-gradient(172deg, #b3d4ff, hsla(0, 0%, 100%, 0) 93%);
        overflow: hidden;

        &.active {
            border-color: #D03050;
        }

        transition: all .37s;

        .text_title {
            font-size: 1.5rem;
            font-weight: bold;
            background: -webkit-linear-gradient(315deg, #3cb0eb 25%, #8064ff);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

        }
    }
}
</style>