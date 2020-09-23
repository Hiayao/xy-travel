<template>
  <div>
    <span>{{tree.account.nickname}}</span>
    <!-- <div v-if="tree.parent" class="children-item"> -->
    <tree :tree="tree.parent" v-if="tree.parent">
      <span>{{tree.account.nickname}}</span>
      <tree :tree="tree.parent" v-if="tree.parent">{{tree.account.nickname}}</tree>
    </tree>
    <!-- </div> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
// import tree from '@/components/tree.vue'
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