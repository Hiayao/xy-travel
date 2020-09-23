<template>
  <div>
    <div class="list-item" v-for="(item, index) in tree" :key="index">
      <div class="item-name">
        <span>{{item.account.nickname}}</span>
      </div>
      <div v-if="item.parent" class="children-item">
        <tree :list="item.parent">111</tree>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
// import { tree } from '@/components/tree.vue'
// interface Data {}
export default defineComponent({
  name: "",
  props: {
      tree:{
          type: Array
      }
  },
  components: {},
  setup(props, ctx: SetupContext) {
    // let data: Data = reactive<Data>({});
    return {
    //   ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
</style>