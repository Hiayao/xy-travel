<template>
  <div></div>
</template>

<script lang='ts'>
import router from "@/router";
import api from "@/http/api";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import { useRoute } from "vue-router";
interface Data {
  ids: number;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();

    const data: Data = reactive<Data>({
      ids: 0,
    });
    const getDetail = (): void => {
      api
        .getHotelD(data.ids)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    onMounted(() => {
      console.log(route.query);
      data.ids = Number(route.query.ids as string);
      getDetail()
    });
    return {
      ...toRefs(data),
      getDetail,
    };
  },
});
</script>

<style scoped lang='scss'>
</style>