<template>
  <div class="login_All flex jc ac">
    <div class="card">
      <div class="cardTop flex">
        <div v-for="(item,index) in tabList" :key="index" class="tabOne flex jc ac" @click="choiceOne(index)" :class="{'bgd':key === index}">{{item.tab}}</div>
      </div>
      <div v-if="key===0">111</div>
      <div v-if="key===1">222</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
interface Data {
  tabList: object[];
  key: number;
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
      key: 0,
    });
    const choiceOne = (index: number): void => {
      data.key = index;
    };
    return {
      ...toRefs(data),
      choiceOne,
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
.tabOne{
    width: 50%;
    font-size: 16px;
    &:hover{
        cursor: pointer;
    }
}
.bgd{
    background: #fff;
    color: rgb(255,165,0);
    font-weight: 600;
    border-top: 2px solid rgb(255,165,0);
}
</style>