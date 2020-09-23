<template>
  <div class="home_All flex jc">
    <div class="home"></div>
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
import api from "@/http/api";
// interface Data {}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    onMounted(() => {
      api
        .getBanners()
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    });
    // const data: Data = reactive<Data>({});
    return {
      // ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.home_All {
  width: 100%;
  height: 750px;
}
.home {
  width: 1280px;
  height: 750px;
  background:violet;
}
</style>