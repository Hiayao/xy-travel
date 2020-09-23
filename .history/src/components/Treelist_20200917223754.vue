<template>
  <div>
    <span>{{tree.account.nickname}}</span>
      <Treelist :tree="tree.parent"  v-if="tree.parent">
          <!-- {{tree.account.nickname}} -->
      </Treelist>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
// interface Data {}
export default defineComponent({
  name: "",
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