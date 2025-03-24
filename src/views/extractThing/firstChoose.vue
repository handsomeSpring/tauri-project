<template>
    <div class="choose__container">
        <div class="choose__item" :class="activeChoose === 'Group' ? 'active' : ''" @click="handleClick('Group')">
            <p class="text_title">小组赛</p>
            <img src="../../assets/images/Excel.png">
        </div>
        <div class="choose__item" :class="activeChoose === 'Elimi' ? 'active' : ''" @click="handleClick('Elimi')">
            <p class="text_title">淘汰赛</p>
            <img src="../../assets/images/teamNumber.png">
        </div>
        <div class="choose__item" :class="activeChoose === 'Ring' ? 'active' : ''" @click="handleClick('Ring')">
            <p class="text_title">擂台赛</p>
            <img src="../../assets/images/leitai.png">
        </div>
    </div>
    <preNextButton 
       v-if="!readOnly"
       :validateFunction="validator"
       :nowProcess="props.nowProcess"
       @nextClick="handleNext"
       @preClick="handlePre"
    ></preNextButton>
</template>

<script setup lang='ts'>
const emits = defineEmits(['nextClick', 'preClick']);
const props = defineProps({
    nowProcess:{
        type:Number,
        required:true
    },
    extractObject:{
        type:Object,
        required:true
    },
    readOnly:{
        type:Boolean,
        required:true
    }
});
const activeChoose = ref<string | null>(null);
const init = ()=>{
    activeChoose.value = props.extractObject.gameMode;
}
init();
const handleClick = (type: string) => {
    if(props.readOnly) return;
    activeChoose.value = type;
};

const validator = (): ReturnValidator => {
    if (activeChoose.value) {
        return {
            flag: true,
            messageText: 'ok'
        }
    } else {
        return {
            flag: false,
            messageText: '请选择赛制'
        }
    }
}
const resetData = () => {
    activeChoose.value = null;
}
const handleNext = () => {
    emits('nextClick',activeChoose.value,'gameMode');
}
const handlePre = () => {
    resetData();
    emits('preClick');
}
</script>
<style scoped lang='scss'>
.choose__container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
        position: relative;
        &.active {
            border-color: #D03050;
        }

        transition: all .37s;

        .text_title {
            font-size: 1.5rem;
            font-weight: bold;
            background: -webkit-linear-gradient(315deg, #e0d322 25%, #e23a2e);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            position: relative;
            z-index:2;
        }
        img{
            position: absolute;
            right:-25px;
            bottom:0;
            width: 100%;
            height: 100%;
            opacity: 0.85;
            z-index:1;
        }
    }
}
</style>