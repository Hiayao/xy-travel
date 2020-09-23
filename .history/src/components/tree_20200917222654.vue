<template>
  <div>
    <span>{{tree.account.nickname}}</span>
    <!-- <div v-if="tree.parent" class="children-item"> -->
      <trees :tree="tree.parent"  v-if="tree.parent">
          {{tree.account.nickname}}
      </trees>
    <!-- </div> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
import trees from '@/components/trees.vue'
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