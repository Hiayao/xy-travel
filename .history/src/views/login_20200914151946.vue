<template>
  <div class="login_All flex jc ac">
    <a-card
      style="width:35%"
      title="Card title"
      :tab-list="tabList"
      :active-tab-key="key"
      @tabChange="key => onTabChange(key, 'key')"
      class="card"
    >
      <template v-slot:customRender="item">
        <span>
          <home-outlined />
          {{ item.key }}
        </span>
      </template>
      <template v-slot:extra>
        <a href="#">More</a>
      </template>
      {{ contentList[key] }}
    </a-card>
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
          // tab: 'tab1',
          slots: { tab: "customRender" },
        },
        {
          key: "tab2",
          tab: "tab2",
        },
      ],
      key: "tab1",
      contentList: {
        tab1: "content1",
        tab2: "content2",
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
  width: 400px;
}
</style>