<template>
  <div class="flex jc" style="margin-top:20px">
      <div class="orderBox flex jsb">
          <div class="BoxOne"></div>
          <div class="BoxTwo"></div>
      </div>
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
import { useRoute, useRouter } from "vue-router";
import api from "@/http/api";
interface Data {
  id: number;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    const data: Data = reactive<Data>({
      id: 0,
    })
    const getAir = (): void => {
      api
        .getAirs(data.id)
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    onMounted(() => {
      console.log(route.query);
      data.id = Number(route.query.id as string)
      getAir()
    });
    return {
      ...toRefs(data),
      getAir,
    }
  },
});
</script>

<style scoped lang='scss'>
.orderBox{
    width: 1000px;
    height: 1000px;
    background: orchid;
}
.BoxOne{
    width: 550px;
    height: 100%;
    background: palegoldenrod;
}
.BoxTwo{
    width: 430px;
    height: 100%;
    background: paleturquoise;
}
</style>