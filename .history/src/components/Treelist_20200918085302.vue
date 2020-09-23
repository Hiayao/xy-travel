<template>
  <div>
    <!-- <span>{{tree.account.nickname}}</span> -->

    <div class="flex jsb">
      <div class="flex">
        <a-avatar :src="'http://157.122.54.189:9095' + tree.account.defaultAvatar" alt />
        <div>{{tree.account.nickname}}</div>
        <div>{{tree.updatedAt}}</div>
      </div>
      <div>{{tree.level}}</div>
    </div>
    <treelist :tree="tree.parent" v-if="tree.parent" class="treelist">
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
.treelist{
  width: 90%;
}
</style>