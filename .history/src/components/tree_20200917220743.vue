<template>
  <div>
    <!-- <div class="list-item" v-for="(item, index) in tree" :key="index">
      <div class="item-name"> -->
        <span>{{tree.account.nickname}}</span>
      <!-- </div> -->
      <div v-if="tree.parent" class="children-item">
        <!-- <tree :tree="tree.parent">111</tree> -->
        111
      </div>
    <!-- </div> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, SetupContext } from "vue";
import tree from '@/components/tree.vue'
// interface Data {}
export default defineComponent({
  name: "",
  props: {
      tree:{
          type: Object
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