<template>
  <div class="login_All flex jc ac">
    <div class="card"></div>
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
          key: "tab1",
          tab: "登录",
          slots: { tab: "customRender" },
        },
        {
          key: "tab2",
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
.card{
    width: 35%;
    height: 200px;
    background: #fff;
}
</style>