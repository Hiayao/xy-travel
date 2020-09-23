<template>
  <div class="box flex jc">
    <div class="top flex jsa ac">
      <div class="flex ac">
        <img src="../assets/logo.jpg" alt class="logo" />
        <div
          v-for="(item,index) in topNav"
          :key="index"
          class="navOne flex ac"
          :class="{'border':fleg===index}"
          @mouseenter="finger(index)"
        >{{item.name}}</div>
      </div>
      <div>登录 / 注册</div>
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
        data.fleg = index
    }
    return {
      ...toRefs(data),
      finger,
    };
  },
});
</script>

<style scoped lang='scss'>
.top {
  width: 1280px;
  height: 60px;
  border-bottom: 1px solid #c9c9c9;
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
.border{
    border-bottom: 5px solid rgb(64,158,255);
    color: rgb(64,158,255);
}
</style>