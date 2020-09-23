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
                ref="select"
                placeholder="起飞机场"
                @change="ChangeValue"
              >
                <a-select-option :value="item" v-for="(item,index) in airport" :key="index">{{item}}</a-select-option>
              </a-select>
            </div>
            <!-- 起飞时间 -->
            <div>
              <a-select
                v-model:value="value1"
                style="width: 120px"
                ref="select"
                placeholder="起飞时间"
                @change="ChangeValue1"
              >
                <a-select-option :value="item" v-for="(item,index) in airTime" :key="index">{{item}}</a-select-option>
              </a-select>
            </div>
            <!-- 航空公司 -->
            <div>
              <a-select
                v-model:value="value2"
                style="width: 120px"
                ref="select"
                placeholder="航空公司"
                @change="ChangeValue2"
              >
                <a-select-option :value="item" v-for="(item,index) in airline" :key="index">{{item}}</a-select-option>
              </a-select>
            </div>
            <!-- 机型 -->
            <div>
              <a-select
                v-model:value="value3"
                style="width: 120px"
                ref="select"
                placeholder="机型"
                @change="ChangeValue3"
              >
                <a-select-option
                  :value="item"
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

        <div
          v-for="(item,index) in flights.slice((pageNumber-1)*pageSize,pageNumber*pageSize)"
          :key="index"
          class="flights"
        >
          <div class="flex jsb ac" @click="choice(item,index)">
            <div class="airline_name flex ac">
              <div style="margin-right:5px">{{item.airline_name}}</div>
              <div>{{item.flight_no}}</div>
            </div>
            <div class="dep_time flex column jc ac">
              <div style="font-size:24px">{{item.dep_time}}</div>
              <div style="font-size:12px;color:#999">{{item.org_airport_name}}</div>
            </div>
            <div class="duration flex ac jc">{{duration[0]}}小时{{duration[1]}}分钟</div>
            <div class="arr_time flex column jc ac">
              <div style="font-size:24px">{{item.arr_time}}</div>
              <div style="font-size:12px;color:#999">{{item.dst_airport_name}}</div>
            </div>
            <div class="base_price flex jfe ac">
              <div>￥</div>
              <div style="font-size:24px;color:orange">{{item.base_price}}</div>
              <div style="margin-left:2px">起</div>
            </div>
          </div>
          <div v-if="item.check === true&&flag === index" class="down flex">
            <div class="downs flex ac">低价推荐</div>
            <div>
              <div
                v-for="(item1,index1) in item.seat_infos"
                :key="index1"
                class="seat_infos flex ac"
              >
                <div class="flex ac" style="width:390px;font-size:12px">
                  <div style="color:rgb(0,128,0)">{{item1.name}}</div>
                  <div class="xian"></div>
                  <div>{{item1.supplierName}}</div>
                </div>
                <div style="width:165px" class="flex ac jsb">
                  <div class="settle_price">￥ {{item1.settle_price}}</div>
                  <div style="width:80px">
                    <a-button type="primary" size="small" @click="checkSure(item)">选定</a-button>
                    <div>剩余：{{item1.discount}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <div class="fenye">
          <a-pagination
            :total="flights.length"
            :show-total="total => `共 ${total} 条`"
            :page-size="pageSize"
            :page-size-options="pageSizeOptions"
            v-model:current="current"
            v-model:pageSize="pageSize"
            show-size-changer
            show-quick-jumper
            @showSizeChange="onShowSizeChange"
            @change="onChange"
          >
            <template v-slot:buildOptionText="props">
              <span v-if="props.value !== '20'">{{ props.value }}条/页</span>
              <span v-else>全部</span>
            </template>
          </a-pagination>
        </div>
      </div>

      <div class="rightAll">
        <div class="rightOne">
          <div class="flex jsb ac" style="padding:10px">
            <div class="flex column ac">
              <img src="../assets/hui.png" alt class="icon" />
              <div>航协认证</div>
            </div>
            <div class="flex column ac">
              <img src="../assets/dun.png" alt class="icon" />
              <div>出行保证</div>
            </div>
            <div class="flex column ac">
              <img src="../assets/dianhua.png" alt class="icon" />
              <div>7X24</div>
            </div>
          </div>
          <div class="free flex ac">免费客服电话：4006345678转2</div>
        </div>
        <div class="rightTwo">
          <div class="Twoname">历史查询</div>
          <div v-for="(item,index) in history" :key="index" class="history_btn flex ac jsb">
            <div>
              <div>{{item.departCity}} - {{item.destCity}}</div>
              <div>{{departDate}}</div>
            </div>
            <a-button type="primary" size="small" @click="again(item)">选择</a-button>
          </div>
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
import { AirsRes, AirFlights } from "@/types";
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
  flights: AirFlights[]; //航班信息列表
  list: AirFlights[]; //航班信息列表
  duration: string[]; //航行时长
  fleg: boolean;
  flag: number;
  total: number;
  current: number;
  pageSize: number;
  pageSizeOptions: string[];
  pageNumber: number;
  path: string;
  history: object[];
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
      list: [],
      fleg: false,
      flag: -1,
      total: 0,
      current: 1,
      pageSize: 5,
      pageNumber: 1,
      pageSizeOptions: ["5", "10", "15", "20"],
      path: "/air",
      history: [],
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
          data.total = res.total;
          data.airport = res.options.airport;
          data.flights = res.flights;
          data.list = res.flights;
          res.flights.map((item: any) => {
            item.check = false
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
            item.arrTimes.map(() => {
              item.depTimes.map(() => {
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
      data.flights = data.list;
    };
    const choice = (item: any,index: number): void => {
      // data.fleg = !data.fleg;
      console.log(item);
      item.check = true
      data.flag = index;
      console.log(data.flag);
      console.log(data.fleg);
    };
    const ChangeValue = (value: string): void => {
      console.log(`selected ${value}`);
      data.flights = data.flights.filter((item: any) => {
        return item.org_airport_name === value;
      });
    };
    const ChangeValue1 = (value: string): void => {
      if (value.length === 11) {
        data.flights = data.flights.filter((item: any) => {
          return (
            Number(String(value)[0] + String(value)[1]) <
              Number(item.depTimes[0]) &&
            Number(item.depTimes[0]) < Number(String(value)[7])
          );
        });
      }
      if (value.length === 12) {
        data.flights = data.flights.filter((item: any) => {
          return (
            Number(String(value)[0]) < Number(item.depTimes[0]) &&
            Number(item.depTimes[0]) <
              Number(String(value)[7] + String(value)[8])
          );
        });
      }
      if (value.length === 13) {
        data.flights = data.flights.filter((item: any) => {
          return (
            Number(String(value)[0]) < Number(item.depTimes[0]) &&
            Number(item.depTimes[0]) <
              Number(String(value)[8] + String(value)[9])
          );
        });
      }
    };
    const ChangeValue2 = (value: string): void => {
      console.log(`selected ${value}`);
      data.flights = data.list.filter((item: any) => {
        return item.airline_name === value;
      });
    };
    const ChangeValue3 = (value: string): void => {
      console.log(`selected ${value}`);
      data.flights = data.flights.filter((item: any) => {
        return item.planeSize === value;
      });
    };
    const onShowSizeChange = (): void => {
      // console.log(current, pageSize);
      // data.pageSize = pageSize
    };
    const onChange = (pageNumber: number): void => {
      // console.log("Page: ", pageNumber);
      data.pageNumber = pageNumber;
    };
    const again = (item: any): void => {
      console.log(item);
      (data.departCity = item.departCity),
        (data.departCode = item.departCode),
        (data.destCity = item.destCity),
        (data.destCode = item.destCode),
        (data.departDate = item.departDate);
        getAirList();
    };
    const checkSure = (item: any): void => {
      console.log(item);

    }
    onMounted(() => {
      console.log(route.query);
      (data.departCity = route.query.departCity as string),
        (data.departCode = route.query.departCode as string),
        (data.destCity = route.query.destCity as string),
        (data.destCode = route.query.destCode as string),
        (data.departDate = route.query.departDate as string);
      if (route.query.departCode) {
        getAirList();
      }

      data.history = JSON.parse(localStorage.getItem("history")!).reverse();
    });
    return {
      ...toRefs(data),
      revoke,
      choice,
      ChangeValue,
      ChangeValue1,
      ChangeValue2,
      ChangeValue3,
      onShowSizeChange,
      onChange,
      again,
      checkSure,
    };
  },
});
</script>

<style scoped lang='scss'>
.fligthsBox {
  width: 1000px;
}
.leftAll {
  width: 740px;
}
.rightAll {
  width: 240px;
}
.news {
  padding: 5px;
  background: rgb(246, 246, 246);
  width: 100%;
  margin: 20px 0 10px 0;
  border: 1px solid #ddd;
  font-size: 13px;
}
.flights {
  padding: 20px 20px;
  width: 100%;
  color: #000;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}
.airline_name {
  width: 25%;
  padding: 0 20px;
}
.dep_time {
  width: 13%;
}
.duration {
  width: 14%;
  height: 40px;
  color: #999;
  border-bottom: 1px solid #ddd;
}
.arr_time {
  width: 13%;
}
.base_price {
  width: 25%;
  padding: 0 30px;
}
.xian {
  width: 1px;
  height: 14px;
  background: #000;
  margin: 0 5px;
}
.down {
  padding: 0 10px;
  background: rgb(246, 246, 246);
}
.downs {
  width: 120px;
}
.seat_infos {
  padding: 15px 0;
}
.settle_price {
  font-size: 20px;
  color: orange;
}
.fenye {
  margin: 20px 0;
}
.rightOne {
  width: 100%;
  height: 120px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}
.rightTwo {
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px;
}
.icon {
  width: 45px;
  height: 43px;
}
.free {
  width: 100%;
  background: rgb(246, 246, 246);
  height: 35px;
  padding: 0 10px;
}
.Twoname {
  font-size: 16px;
  color: #000;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
</style>