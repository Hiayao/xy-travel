<template>
  <div class="login_All flex jc ac">
    <div class="card">
      <div class="cardTop flex">
        <div v-for="(item,index) in tabList" :key="index" class="tabOne">{{item.tab}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {
  tabList: object[];
  key: string;
  contentList: object;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      tabList: [
        {
          tab: "登录",
        },
        {
          tab: "注册",
        },
      ],
      key: "tab1",
      contentList: {
        tab1: "登录",
        tab2: "注册",
      },
    });
    const onTabChange = (key: string): void => {
      console.log(key);
      data.key = key;
    };
    return {
      ...toRefs(data),
      onTabChange,
    };
  },
});
</script>

<style scoped lang='scss'>
.login_All {
  background-image: url("../assets/th03.jpg");
  background-size: 300;
  height: 750px;
}
.card {
  width: 30%;
  height: 200px;
  background: #fff;
}
.cardTop{
    height: 50px;
    background: rgb(238,238,238);
}
</style>