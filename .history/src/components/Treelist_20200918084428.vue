<template>
  <div>
    <span>{{tree.account.nickname}}</span>
      <treelist :tree="tree.parent"  v-if="tree.parent">
          <!-- {{tree.account.nickname}} -->
      </treelist>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
// interface Data {}
export default defineComponent({
  name: "treelist",
  props: {
    tree: {
      type: Object,
    },
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