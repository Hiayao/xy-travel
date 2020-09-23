<template>
  <div class="layout pore">
    <div class="Top_box flex jc">
      <!-- 头部导航 -->
      <div class="top flex jsa ac">
        <div class="flex ac">
          <img src="../assets/logo.jpg" alt class="logo" />
          <div
            v-for="(item,index) in topNav"
            :key="index"
            class="navOne flex ac column pore"
            :class="{'colour':fleg===index}"
            @mouseenter="finger(index)"
            @mouseleave="fingerOut"
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
    <div class="bottom_box poab">
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {
  topNav: object[];
  fleg: number;
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
    });

    const finger = (index: number): void => {
      data.fleg = index;
    };
    const fingerOut = (): void => {
      data.fleg = -1;
    };
    return {
      ...toRefs(data),
      finger,
      fingerOut,
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
  width: 1280px;
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
</style>