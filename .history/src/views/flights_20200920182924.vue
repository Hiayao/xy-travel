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
          <a-button
            type="primary"
            shape="round"
            size="small"
            style="font-size:12px"
            @click="revoke"
          >撤销</a-button>
        </div>

        <div class="news flex ac jsb">
          <div class="tac" style="width:20%">航空信息</div>
          <div class="tac" style="width:30%">起飞时间</div>
          <div class="tac" style="width:30%">到达时间</div>
          <div class="tac" style="width:20%">价格</div>
        </div>

        <div v-for="(item,index) in flights" :key="index" class="flights flex jsb ac">
          <div class="airline_name flex ac">
            <div>{{item.airline_name}}</div>
            <div>{{item.flight_no}}</div>
          </div>
          <div class="dep_time flex column jc ac">
            <div>{{item.dep_time}}</div>
            <div>{{item.org_airport_name}}</div>
          </div>
          <div class="duration flex ac jc">{{duration[0]}}小时{{duration[1]}}分钟</div>
          <div class="arr_time flex column jc ac">
            <div style="font-size:24px">{{item.arr_time}}</div>
            <div style="font-size:12px;color:#999">{{item.dst_airport_name}}</div>
          </div>
          <div class="base_price flex jfe">
            <div>￥</div>
            <div>{{item.base_price}}</div>
            <div>起</div>
          </div>
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
import { AirsRes, AirOptions, AirFlights } from "@/types";
import dayjs from "dayjs";
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
  flights: AirFlights[]; //航班信息
  duration: string[]; //航行时长
  time: number;
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
      value: "",
      value1: "",
      value2: "",
      value3: "",
      flights: [],
      duration: [],
      time: 0,
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
          data.flights = res.flights;
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
            item.arrTimes = item.arr_time.split(":");
            item.depTimes = item.dep_time.split(":");
            item.arrTimes.map((item1: any) => {
              item.depTimes.map((item2: any) => {
                if (Number(item.depTimes[0]) <= Number(item.arrTimes[0])) {
                  if (Number(item.depTimes[1]) < Number(item.arrTimes[1])) {
                    data.duration[1] = String(
                      Number(item.arrTimes[1]) - Number(item.depTimes[1])
                    );
                    data.duration[0] = String(
                      Number(item.arrTimes[0]) - Number(item.depTimes[0])
                    );
                  }
                  if (Number(item.depTimes[1]) >= Number(item.arrTimes[1])) {
                    data.duration[1] = String(
                      Number(item.arrTimes[1]) - Number(item.depTimes[1]) + 60
                    );
                    data.duration[0] = String(
                      Number(item.arrTimes[0]) - Number(item.depTimes[0]) - 1
                    );
                  }
                }
                if (Number(item.depTimes[0]) > Number(item.arrTimes[0])) {
                  data.duration = ["2", "15"];
                }
              });
            });
            // console.log(data.duration);
          });
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const revoke = (): void => {
      data.value = "";
      data.value1 = "";
      data.value2 = "";
      data.value3 = "";
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
.news {
  padding: 5px;
  background: rgb(246, 246, 246);
  width: 100%;
  margin: 20px 0 10px 0;
  border: 1px solid #ddd;
  font-size: 13px;
}
.flights{
  padding: 5px 20px;
  width: 100%;
  color: #000;
}
.airline_name{
  width: 25%;
  padding: 0 20px;
}
.dep_time{
  width: 13%;
}
.duration{
  width: 14%;
  height: 40px;
  border-bottom: 1px solid #ddd;
}
.arr_time{
  width: 13%;
}
.base_price{
  width: 25%;
  padding: 0 30px;
}
</style>