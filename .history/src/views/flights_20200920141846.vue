<template>
  <div class="flex jc" style="margin-top:20px">
    <div class="fligthsBox">
      <div class="flex">
        <div>单程：</div>
        <div>{{departCity}} - {{destCity}} / {{departDate}}</div>
        <div>
          <a-select
            v-model:value="value"
            style="width: 120px"
            @focus="focus"
            ref="select"
            placeholder="起飞机场"
            @change="handleChange"
          >
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </div>
      </div>
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
import { useRoute } from "vue-router";
import api from "@/http/api";
import {AirsRes,AirOptions} from '@/types'
interface Data {
  departCity: string;  //出发城市
  departCode: string;  //出发城市简称
  destCity: string;    //到达城市
  destCode: string;   //到达城市简称
  departDate: string;    //出发日期
  airport: string[];  //出发机场
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const data: Data = reactive<Data>({
      departCity: "",
      departCode: "",
      destCity: "",
      destCode: "",
      departDate: "",
      airport: [],
    });
    const getAirList = (): void => {
      api
        .airList({
          departCity: data.departCity,
          departCode: data.departCode,
          destCity: data.destCity,
          destCode: data.destCode,
          departDate: data.departDate,
        })
        .then((res) => {
          console.log(res: AirsRes);
          data.airport = res.options.airport
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    onMounted(() => {
      console.log(route.query);
      (data.departCity = route.query.departCity as string),
        (data.departCode = route.query.departCode as string),
        (data.destCity = route.query.destCity as string),
        (data.destCode = route.query.destCode as string),
        (data.departDate = route.query.departDate as string);
      getAirList();
    });
    return {
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang='scss'>
.fligthsBox {
  width: 1000px;
  height: 1000px;
  background: olivedrab;
}
</style>