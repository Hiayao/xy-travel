<template>
  <div class="layout pore">
    <div class="Top_box flex jc">
      <!-- 头部导航 -->
      <div class="top flex jsb ac">
        <div class="flex ac">
          <img src="../assets/logo.jpg" alt class="logo" />
          <div
            v-for="(item,index) in topNav"
            :key="index"
            class="navOne flex ac column pore"
            :class="{'colour':fleg===index,'bgd':flag ===index}"
            @mouseenter="finger(index)"
            @mouseleave="fingerOut"
            @click="choiceOne(index)"
          >
            <div class="ItemName flex ac">{{item.name}}</div>
            <div class="border poab" v-if="fleg === index"></div>
          </div>
        </div>
        <div>登录 / 注册</div>
      </div>
    </div>

    <router-view></router-view>

    <!-- 底部公共 -->
    <div class="bottom_box poab flex jc">
      <div class="bottom">
        <div class="btOne flex">
          <div class="oneLeft flex jsb">
              <div v-for="(item,index) in linkList" :key="index" class="Listone">
                  <div class="title">{{item.title}}</div>
                  <div>
                      <div v-for="(item1,index1) in item.itemOne" :key="index1" class="itemOne">{{item1}}</div>
                  </div>
              </div>
          </div>
          <div class="oneRight flex jc ac">
            <img src="../assets/1556522965.png" alt class="img" />
          </div>
        </div>
        <div class="btTwo"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
// interface linkOne {
//     title: string;
//     itemOne: string[];
// }
interface Data {
  topNav: object[];
  fleg: number;
  flag: number;
  linkList: object[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      topNav: [
        { name: "首页", path: "/" },
        { name: "旅游攻略", path: "/" },
        { name: "酒店", path: "/" },
        { name: "国内机票", path: "/" },
      ],
      fleg: -1,
      flag: -1,
      linkList: [
        {
          title: "闲云旅游旅游网",
          itemOne: [
            "上亿旅行者共同打造的旅行神器",
            "60,000 多个全球旅游目的地",
            "600,000 个细分目的地新玩法",
            "760,000,000 次攻略下载",
            "38,000 家旅游产品供应商",
          ],
        },
        {
          title: "关于我们",
          itemOne: [
            "隐私政策 商标声明",
            "服务协议 游记协议",
            "商城平台服务协议",
            "网络信息侵权通知指引",
            "闲云旅游旅游网服务监督员",
            "网站地图加入闲云旅游"
          ],
        },
        {
          title: "旅行服务",
          itemOne: [
            "旅游攻略 酒店预订",
            "旅游特价 国际租车",
            "旅游问答 旅游保险",
            "旅游指南 订火车票",
            "旅游资讯 APP下载",
          ],
        },
      ],
    });

    const finger = (index: number): void => {
      data.fleg = index;
    };
    const fingerOut = (): void => {
      data.fleg = -1;
    };
    const choiceOne = (index: number): void => {
      data.flag = index;
    };
    return {
      ...toRefs(data),
      finger,
      fingerOut,
      choiceOne,
    };
  },
});
</script>

<style scoped lang='scss'>
.Top_box {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #c9c9c9;
}
.top {
  width: 1000px;
  height: 60px;
}
.logo {
  height: 50px;
  margin-right: 30px;
}
.navOne {
  padding: 0 20px;
  font-size: 16px;
  color: #000;
  height: 60px;
  &:hover {
    cursor: pointer;
  }
}
.colour {
  color: rgb(64, 158, 255);
}
.border {
  width: 100%;
  height: 6px;
  background: rgb(64, 158, 255);
  bottom: 0;
}
.ItemName {
  height: 100%;
}
.bottom_box {
  width: 100%;
  height: 320px;
  background: violet;
}
.bgd {
  background: rgb(64, 158, 255);
  color: #fff;
}
.bottom {
  width: 1000px;
  height: 320px;
  background: sandybrown;
}
.btOne {
  height: 220px;
  background: seagreen;
}
.oneLeft {
  width: 700px;
  height: 100%;
  background: seashell;
  font-size: 12px;
  color: #ccc;
}
.img {
  width: 160px;
  height: 160px;
}
.oneRight {
  width: 300px;
  height: 100%;
}
.title{
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 20px;
}
.Listone{
    width: 200px;
}
.itemOne{
margin-bottom: 6px;
}

</style>