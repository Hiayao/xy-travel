<template>
  <div class="box flex jc">
    <div class="top flex jsa ac">
      <div class="flex ac">
        <img src="../assets/logo.jpg" alt class="logo" />
        <div v-for="(item,index) in topNav" :key="index" class="navOne fw6">{{item.name}}</div>
      </div>
      <div>登录/注册</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {
  topNav: object[];
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
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.top {
  width: 1280px;
  height: 60px;
  background: violet;
}
.logo {
  height: 50px;
}
.navOne{
    padding: 0 20px;
}
</style>