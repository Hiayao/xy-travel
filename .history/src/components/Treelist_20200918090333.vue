<template>
  <div class="pore">
    <!-- <span>{{tree.account.nickname}}</span> -->

    <div class="flex jsb">
      <div class="flex">
        <a-avatar :src="'http://157.122.54.189:9095' + tree.account.defaultAvatar" alt />
        <div>{{tree.account.nickname}}</div>
        <div>{{tree.updated_at}}</div>
      </div>
      <div>{{tree.level}}</div>
    </div>
    <div>{{tree.content}}</div>
    <treelist :tree="tree.parent" v-if="tree.parent" class="treelist poab">
      <!-- {{tree.account.nickname}} -->
    </treelist>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
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
    onMounted(() => {
      // props.tree.updatedAt =
    });
    return {
      //   ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.treelist {
  width: 96%;
  margin-left: 2%;
  border: 1px solid #ddd;
}
</style>