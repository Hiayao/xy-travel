<template>
  <div class="flex jc" style="margin-top:20px">
    <div class="fligthsBox flex jsb">
      <div class="leftAll">
        <div class="flex ac jsb">
          <div class="flex ac" style="width:210px">
            <div>单程：</div>
            <div>{{departCity}} - {{destCity}} / {{departDate}}</div>
          </div>
          <div class="flex ac jsb" style="width:520px">
            <!-- 出发机场 -->
            <div>
              <a-select
                v-model:value="value"
                style="width: 120px"
                @focus="focus"
                ref="select"
                placeholder="起飞机场"
                @change="ChangeValue"
              >
                <a-select-option v-for="(item,index) in airport" :key="index">{{item}}</a-select-option>
              </a-select>
            </div>
            <!-- 起飞时间 -->
            <div>
              <a-select
                v-model:value="value1"
                style="width: 120px"
                @focus="focus"
                ref="select"
                placeholder="起飞时间"
                @change="ChangeValue1"
              >
                <a-select-option value="jack" v-for="(item,index) in airTime" :key="index">{{item}}</a-select-option>
              </a-select>
            </div>
            <!-- 航空公司 -->
            <div>
              <a-select
                v-model:value="value2"
                style="width: 120px"
                @focus="focus"
                ref="select"
                placeholder="航空公司"
                @change="ChangeValue2"
              >
                <a-select-option value="jack" v-for="(item,index) in airline" :key="index">{{item}}</a-select-option>
              </a-select>
            </div>
            <!-- 机型 -->
            <div>
              <a-select
                v-model:value="value3"
                style="width: 120px"
                @focus="focus"
                ref="select"
                placeholder="机型"
                @change="ChangeValue3"
              >
                <a-select-option
                  value="jack"
                  v-for="(item,index) in planeSize"
                  :key="index"
                >{{item}}</a-select-option>
              </a-select>
            </div>
          </div>
        </div>

        <div class="flex" style="margin-top:10px">
          <div>筛选：</div>
          <a-button type="primary" shape="round" size="small" style="font-size:12px" @click="revoke">撤销</a-button>
        </div>

        <div class="news flex ac jsb">
          <div class="tac" style="width:20%">航空信息</div>
          <div class="tac" style="width:30%">起飞时间</div>
          <div class="tac" style="width:30%">到达时间</div>
          <div class="tac" style="width:20%">价格</div>
        </div>
      </div>
      <div class="rightAll"></div>
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
import { AirsRes, AirOptions } from "@/types";
interface Data {
  departCity: string; //出发城市
  departCode: string; //出发城市简称
  destCity: string; //到达城市
  destCode: string; //到达城市简称
  departDate: string; //出发日期
  airport: string[]; //出发机场
  value: string; 
  airTime: string[]; //出发时间
  value1: string; 
  airline: string[]; //航空公司
  value2: string; 
  planeSize: string[]; //机型大小
  value3: string; 
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
      airTime: [
        "0:00 - 6:00",
        "6:00 - 12:00",
        "12:00 - 13:00",
        "13:00 - 19:00",
        "19:00 - 24:00",
      ],
      airline: [],
      planeSize: [],
      value: '',
      value1: '',
      value2: '',
      value3: '',
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
        .then((res: AirsRes) => {
          console.log(res);
          data.airport = res.options.airport;
          res.flights.map((item: any) => {
            data.airline.push(item.airline_name);
            if (item.plane_size === "L") {
              item.planeSize = "大";
            }
            if (item.plane_size === "M") {
              item.planeSize = "中";
            }
            if (item.plane_size === "S") {
              item.planeSize = "小";
            }
            data.planeSize.push(item.planeSize);
            data.airline = data.airline.filter(
              (item1: any, index1: number, arr: any) => {
                return arr.indexOf(item1) === index1;
              }
            );
            data.planeSize = data.planeSize.filter(
              (item1: any, index1: number, arr: any) => {
                return arr.indexOf(item1) === index1;
              }
            );
          });
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const revoke = (): void => {
      data.value = ''
      data.value1 = ''
      data.value2 = ''
      data.value3 = ''
    }
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
      revoke,
    };
  },
});
</script>

<style scoped lang='scss'>
.fligthsBox {
  width: 1000px;
  height: 1000px;
}
.leftAll {
  background: orchid;
  width: 740px;
  height: 100%;
}
.rightAll {
  width: 240px;
  height: 100%;
  background: palegoldenrod;
}
.news{
  padding: 10px;
  background: #999;
  width: 100%;
}
</style>