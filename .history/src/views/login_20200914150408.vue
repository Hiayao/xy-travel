<template>
  <div class="login_All">
    <a-card
      style="width:100%"
      title="Card title"
      :tab-list="tabList"
      :active-tab-key="key"
      @tabChange="key => onTabChange(key, 'key')"
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
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    let data: Data = reactive<Data>({
        tabList: [
        {
          key: 'tab1',
          // tab: 'tab1',
          slots: { tab: 'customRender' },
        },
        {
          key: 'tab2',
          tab: 'tab2',
        },
      ],
       key: 'tab1',
    })
    return {
      // ...toRefs(data),
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
</style>