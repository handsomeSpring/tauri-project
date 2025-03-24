<template>
    <div class="button__container">
        <n-button type="primary" @click="handlePre" :disabled="stepPreDis">
            <template #icon>
                <n-icon>
                    <ArrowBackSharp />
                </n-icon>
            </template>
        </n-button>
        第{{ nowProcess }}步
        <n-button type="primary" @click="handleNext" :disabled="stepNextDis">
            <template #icon>
                <n-icon>
                    <ArrowForwardSharp />
                </n-icon>
            </template>
        </n-button>
    </div>
</template>

<script setup lang='ts'>
import { ArrowBackSharp, ArrowForwardSharp } from '@vicons/ionicons5';
import { useMessage, useDialog } from 'naive-ui';
const emits = defineEmits(['preClick', 'nextClick']);
const props = defineProps({
    validateFunction: {
        type: Function,
        required: true
    },
    revokeWarningText: {
        type: String,
        default: '您确定撤回吗？'
    },
    nowProcess:{
        type:Number,
        required:true
    }
})
const message = useMessage();
const dialog = useDialog()
const stepPreDis = computed(() => {
    return props.nowProcess === 1;
});
const stepNextDis = computed(() => {
    return props.nowProcess === 4;
});

const handleNext = async () => {
    const { messageText, flag } = await props.validateFunction();
    if (!flag) return message.error(messageText);
    emits('nextClick');
}
const handlePre = () => {
    dialog.warning({
        title: '警告',
        content: props.revokeWarningText,
        positiveText: '确定',
        negativeText: '取消',
        draggable: true,
        onPositiveClick: () => {
            emits('preClick');
        }
    })
}
</script>
<style scoped lang='scss'>
.button__container {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    gap: 1rem;
}
</style>