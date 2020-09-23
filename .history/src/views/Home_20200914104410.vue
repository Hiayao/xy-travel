<template>
  <div></div>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import api from "@/http/api";
// interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    onMounted(() => {
      api.getBanners().then((res: any) => {
        console.log(res);
      }).catch((err: any) => {
        console.log(err);
      })
    });
    // const data: Data = reactive<Data>({});
    return {
      // ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
</style>