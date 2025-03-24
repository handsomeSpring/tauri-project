<template>
    <div class="form__container">
        <n-form ref="formRef" :model="form" :rules="rules" label-placement="left" label-align="right" label-width="120"
            require-mark-placement="right-hanging">
            <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="抽签赛制" path="gameMode">
                    {{ computedGameMode(form.gameMode) }}
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="抽签模式" path="extractMode">
                    {{ computedExtractMode(form.extractMode) }}
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="抽取标题" path="extractLabel">
                    <n-input v-model:value="form.extractLabel" :readonly="props.readOnly" placeholder="请输入抽取标题" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="抽取战队数量" path="extractNumber">
                    <n-input-number :min="0" :max="256" v-model:value="form.extractNumber" :readonly="props.readOnly"
                        placeholder="请输入战队数量" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="分组数量" path="groupNumber">
                    <n-input-group>
                        <n-input-number :min="1" v-model:value="form.groupNumber" :step="1" :readonly="props.readOnly"
                            placeholder="请输入分组数量" :style="{ width: '60%' }" />
                        <n-input v-model:value="groupEvenryPerson" disabled :style="{ width: '40%' }" />
                    </n-input-group>
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="添加战队">
                    <n-input-group>
                        <n-input v-model:value="teamName" :style="{ width: '33%' }" placeholder="请输入战队名" />
                        <n-button type="primary" ghost>
                            单个添加
                        </n-button>
                        <n-button type="info">
                            全局导入
                        </n-button>
                    </n-input-group>
                </n-form-item-gi>
            </n-grid>
        </n-form>
    </div>
    <preNextButton v-if="!readOnly" :validateFunction="validator" :nowProcess="props.nowProcess"
        revokeWarningText="您确定返回到第一步重新选择赛制吗？" @nextClick="handleNext" @preClick="handlePre"></preNextButton>
</template>

<script setup lang='ts'>
import type { FormInst ,FormItemRule} from 'naive-ui';
const emits = defineEmits(['nextClick', 'preClick']);
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
interface ExtractOptions {
    extractLabel: string | null //抽取标题
    extractNumber: number | null //抽取人数
    groupNumber: number | null //分组
    gameMode: 'Group' | 'Elimi' | 'Ring' | null
    extractMode: 'Card' | 'Ballot' | null
}
const formRef = ref<FormInst | null>(null);
const form = reactive<ExtractOptions>({
    extractLabel: null,
    extractNumber: null,
    groupNumber: null,
    gameMode: null,
    extractMode: null
})
const teamName = ref('');
const rules = {
    gameMode: {
        required: true,
        message: '请选择游戏赛制',
        trigger: ['input', 'blur']
    },
    extractMode: {
        required: true,
        message: '请选择抽签模式',
        trigger: ['input', 'blur']
    },
    extractLabel: {
        required: true,
        message: '请输入抽取标题',
        trigger: ['input', 'blur']
    },
    extractNumber: {
        required: true,
        message: '请输入抽取战队数量',
        trigger: 'blur',
        validator(rule: FormItemRule, value: number) {
            return value && value > 0
        },
    },
    groupNumber: {
        required: true,
        message: '请输入组数',
        trigger: 'blur',
        validator(rule: FormItemRule, value: number) {
            return value && value > 0
        },
    }
}
const groupEvenryPerson = computed(() => {
    if (!form.extractNumber || !form.groupNumber) {
        return '自动计算';
    }
    if (form.extractNumber < form.groupNumber) {
        return '队数不够一组';
    }
    const every = Math.floor(form.extractNumber / form.groupNumber);
    return `每组 ${every} 队`
})
const init = () => {
    Object.assign(
        form,
        (props.extractObject?.options ?? {}),
        {
            extractMode: props.extractObject?.extractMode,
            gameMode: props.extractObject?.gameMode
        })
}
init();

const validator = async (): Promise<ReturnValidator> => {
    try {
        await formRef.value?.validate();
        return {
            flag: true,
            messageText: 'ok'
        }
    } catch (error) {
        return {
            flag: false,
            messageText: '情完整填写表单'
        }
    }
}
// 计算比赛模式
const computedGameMode = (mode: 'Group' | 'Elimi' | 'Ring' | null): string => {
    if (!mode) return '未选择比赛模式'
    const mapList = {
        'Group': '小组赛',
        'Elimi': '淘汰赛',
        'Ring': '擂台赛'
    };
    return mapList[mode];
}

const computedExtractMode = (mode: 'Card' | 'Ballot' | null): string => {
    if (!mode) return '未选择比赛模式'
    const mapList = {
        'Card': '翻牌抽取',
        'Ballot': '大转盘',
    };
    return mapList[mode];
}
const handleNext = () => {
    emits('nextClick', form, 'options');
}
const handlePre = () => {
    emits('preClick');
}
</script>
<style scoped lang='scss'>
.form__container {
    background: rgba(255, 255, 255, 0.4);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    padding: 2rem;
    border-radius: 1rem;
}
</style>