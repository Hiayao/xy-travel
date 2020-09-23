<template>
  <div class="post_All flex jc">
    <div class="postBox"></div>
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
// interface Data {
// }
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    // let data: Data = reactive<Data>({
    // })

    onMounted(() => {
      api
        .getCityList()
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    });
    return {
      // ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.post_All {
  width: 100%;
  height: 500px;
}
.postBox {
  width: 1000px;
  height: 100%;
  background: violet;
}
</style>