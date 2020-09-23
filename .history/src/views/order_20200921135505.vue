<template>
  <div class="flex jc" style="margin-top:20px">
    <div class="orderBox flex jsb">
      <div class="BoxOne">
        <div>乘机人</div>
        <div>乘机人</div>
        <a-input v-model:value="value" placeholder="Basic usage" />
        <div>证件类型</div>
        <a-input-group compact>
          <a-select v-model:value="value5">
            <a-select-option value="Option1">身份证</a-select-option>
            <a-select-option value="Option2">护照</a-select-option>
          </a-select>
          <a-input style="width: 50%" v-model:value="value6" />
        </a-input-group>
      </div>
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
    });
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
      data.id = Number(route.query.id as string);
      getAir();
    });
    return {
      ...toRefs(data),
      getAir,
    };
  },
});
</script>

<style scoped lang='scss'>
.orderBox {
  width: 1000px;
  height: 1000px;
  background: orchid;
}
.BoxOne {
  width: 580px;
  height: 100%;
  background: palegoldenrod;
}
.BoxTwo {
  width: 400px;
  height: 100%;
  background: paleturquoise;
}
</style>