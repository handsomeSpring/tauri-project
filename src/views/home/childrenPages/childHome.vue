<template>
  <dv-loading v-if="loading">
    <div color-white>
      Loading...
    </div>
  </dv-loading>
  <dv-full-screen-container v-else class="home__container">
    <div class="home__header--grid">
      <dv-decoration1 style="width:200px;height:50px;" />
      <h2 class="visual__text--primary">数据可视化大屏</h2>
      <dv-decoration1 style="width:200px;height:50px;" />
    </div>
    <div class="home__nav--grid">
      <dv-border-box3>
        <div class="nav__three--wrap dv-bg">
          <div class="nav__container">
            <div class="nav__main--content">
              <div class="nav__title--primary">
                <dv-decoration7>
                  <h4>角色选取次数排名</h4>
                </dv-decoration7>
              </div>
              <dv-capsule-chart :config="configRank" class="nav__dv--container" />
            </div>
            <dv-decoration2 :dur="2" style="width:100%;height:5px;" />
          </div>
          <div class="nav__container">
            <div class="nav__main--content">
              <div class="nav__title--primary">
                <dv-decoration7>
                  <h4>粉丝地域</h4>
                </dv-decoration7>
              </div>
              <dv-active-ring-chart :config="conf" class="nav__dv--container" />
            </div>
            <dv-decoration2 :dur="2" style="width:100%;height:5px;" />
          </div>
          <div class="nav__container">
            <div class="nav__main--content">
              <div class="nav__title--primary">
                <dv-decoration7>
                  <h4>服务器CPU</h4>
                </dv-decoration7>
              </div>
              <dv-water-level-pond :config="{ data: [66] }" class="nav__dv--container" />
            </div>
          </div>
        </div>
      </dv-border-box3>
    </div>
    <div class="home__main--grid">
      <dv-border-box3>
        <div class="dv-bg">
          <div class="main__title">
            <dv-decoration7>
              <h4>预算使用情况</h4>
            </dv-decoration7>
          </div>
          <div class="number__info--wrap">
            <div class="number__icon">
              0
            </div>
            <div class="number__icon">
              2
            </div>
            <div class="number__icon">
              8
            </div>
            <div class="number__icon">
              5
            </div>
            <div class="number__icon">
              0
            </div>
            <div class="number__icon">
              元
            </div>
          </div>
          <div class="rank__scroll--wrap">
            <dv-scroll-ranking-board :config="config" style="width:80%;height:100%" />
          </div>
        </div>
      </dv-border-box3>
    </div>
    <div class="home__aside--grid">
      <div class="aside__container--grid">
        <div class="aside__top">
          <dv-border-box3>
            <div class="dv-bg">
              <div class="aside__container--box">
                <div class="nav__title--primary">
                  <dv-decoration7>
                    <h4>服务器内存使用情况</h4>
                  </dv-decoration7>
                </div>
                <dv-decoration-9 style="width:200px;height:200px">
                  <div class="core__text--inner">
                    76%
                  </div>
                </dv-decoration-9>
              </div>
            </div>
          </dv-border-box3>
        </div>
        <div class="aside__bottom">
          <dv-border-box4 :reverse="true">
            <div class="dv-bg">
              <div class="aside__container--box">
                <div class="nav__title--primary">
                  <dv-decoration7>
                    <h4>搜寻ASG众创伙伴中...</h4>
                  </dv-decoration7>
                </div>
                <dv-decoration-12 style="width:200px;height:200px;" />
              </div>
            </div>
          </dv-border-box4>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="home__footer--grid">
      <dv-border-box4>
        <div class="dv-bg">
          <div class="footer__wrap--content">
            <div class="footer__item--content">
              <dv-decoration7 class="footer__dv--title">
                <h4>第七届众创赛筹备进度</h4>
              </dv-decoration7>
              <dv-percent-pond :config="{
                value: 40,
                lineDash: [10, 2],
              }" style="width:200px;height:100px;" />
            </div>
            <dv-decoration2 :dur="2" :reverse="true" style="width:5px;height:100%;" />
            <div class="footer__item--content">
              <dv-decoration7 class="footer__dv--title">
                <h4>资金预算申请进度</h4>
              </dv-decoration7>
              <dv-percent-pond :config="{
                value: 86,
                lineDash: [10, 2],
              }" style="width:200px;height:100px;" />
            </div>
            <dv-decoration2 :dur="2" :reverse="true" style="width:5px;height:100%;" />
            <div class="footer__item--content">
              <dv-decoration7 class="footer__dv--title">
                <h4>ASG人员完备进度</h4>
              </dv-decoration7>
              <dv-percent-pond :config="{
                value: 100,
                lineDash: [10, 2],
              }" style="width:200px;height:100px;" />
            </div>
            <dv-decoration2 :dur="2" :reverse="true" style="width:5px;height:100%;" />
            <div class="footer__item--content">
              <dv-decoration7 class="footer__dv--title">
                <h4>服务器剩余余额</h4>
              </dv-decoration7>
              <dv-percent-pond :config="{
                value: 12,
                lineDash: [10, 2],
              }" style="width:200px;height:100px;" />
            </div>
          </div>
        </div>
      </dv-border-box4>
    </div>
  </dv-full-screen-container>
</template>

<script setup lang='ts'>
import { getBudgetTotal } from '@/api/modules/budget';
import { useMessage } from 'naive-ui';
interface budgetItem{
  budgetTotalMoney:number
  sourceEventId:number
  sourceEventName:string
}
interface Config{
  data:NorKeyValue[],
  unit:string
  labelNum?:number
  showValue?:boolean
}
const message = useMessage();
const loading = ref(true);
const config = reactive<Config>({
  data: [],
  unit: '元',
})
const configRank = reactive<Config>({
  data: [{
    name:'跛脚羊',
    value:18
  },{
    name:'艾薇',
    value:16
  },{
    name:'歌剧演员',
    value:15
  },{
    name:'前锋',
    value:12
  },{
    name:'佣兵',
    value:12
  },{
    name:'教授',
    value:10
  },{
    name:'先知',
    value:5
  }],
  unit: '次',
  labelNum: 6,
  showValue:true
})
const conf = reactive({
  lineWidth: 24,
  digitalFlopStyle: {
    fill: 'pink',
    fontSize: 16
  },
  data: [
    {
      name: '福州',
      value: 98,
    },
    {
      name: '南昌',
      value: 150,
    },
    {
      name: '武汉',
      value: 62,
    },
    {
      name: '广东',
      value: 54,
    },
  ],
});
const initData = async ()=>{
  try {
    loading.value = true;
    const { code, message, data } = await getBudgetTotal() as symbolResponse;
    if(code !== 200) throw new Error(message);
    data.forEach((item:budgetItem) => {
      config.data.push({
        value:item.budgetTotalMoney,
        name:item.sourceEventName
      })
    });
  } catch (error:any) {
    message.error(error.message ? error.message : error);
  }finally{
    nextTick(()=>{
      loading.value = false;
    })
  }
}
initData();
</script>
<style scoped lang='scss'>
.home__container {
  display: grid;
  background-image: url('../../../assets/images/visualScreen_bg.png');
  background-size: cover;
  grid-template-areas:
    "head head head"
    "nav main aside"
    "nav main aside"
    "nav footer footer";
  grid-template-columns: 20% 55% 25%;
  grid-template-rows: 10% 30% 30% 30%;

  .home__header--grid {
    grid-area: head;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .visual__text--primary {
      color: #fff;
      font-size: 2.5rem;
    }
  }

  .home__nav--grid {
    grid-area: nav;

    .nav__three--wrap {
      display: grid;
      padding: 25px;
      width: calc(100% - 50px);
      height: calc(100% - 50px);
      grid-template-rows: repeat(3, 1fr);

      .nav__container {
        height: 100%;

        .nav__main--content {
          height: calc(100% - 5px);
        }
      }
    }
  }

  .home__aside--grid {
    grid-area: aside;

    .aside__container--grid {
      display: grid;
      height: 100%;
      grid-template-rows: repeat(2, 1fr);

      .aside__top {
        height: 100%;

        .aside__container--box {
          padding-top: 25px;
          height: calc(100% - 25px);
          width: 100%;
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-direction: column;

          .core__text--inner {
            font-size: 28px;
            text-shadow: 0 0 3px #7acaec;
            color: rgb(74 222 128);
            font-weight: 600;
          }
        }
      }

      .aside__bottom {
        height: 100%;

        .aside__container--box {
          padding-top: 25px;
          height: calc(100% - 25px);
          width: 100%;
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-direction: column;

          .core__text--inner {
            font-size: 28px;
            text-shadow: 0 0 3px #7acaec;
            color: rgb(74 222 128);
            font-weight: 600;
          }
        }
      }
    }
  }

  .home__footer--grid {
    grid-area: footer;

    .footer__wrap--content {
      display: flex;
      padding: 20px;
      height: calc(100% - 40px);
      width: calc(100% - 40px);

      .footer__item--content {
        height: 100%;
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }
    }
  }

  .home__main--grid {
    grid-area: main;

    .main__title {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 1rem;
    }

    .number__info--wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      .number__icon {
        background-color: #04318099;
        color: #08e5ff;
        height: 60px;
        width: 70px;
        font-size: 35px;
        font-weight: 700;
        line-height: 60px;
        text-align: center;
      }
    }

    .rank__scroll--wrap {
      width: 100%;
      margin: 1rem 0;
      height: calc(100% - 70px - 50px - 1rem - 2rem);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>