<template>
  <div class="air_All flex jc">
    <div class="airBox">
      <div class="flex ac" style="margin-bottom:10px">
        <img src="../assets/airIcon.png" alt class="airIcon" />
        <div class="china">国内机票</div>
      </div>

      <div class="flex jsb">
        <div class="query">
          <div class="mode flex">
            <div class="modeOne flex ac jc">
              <div class="iconBox bdrr50 flex jc ac">
                <SwapRightOutlined class="icon" />
              </div>
              <div>单程</div>
            </div>
            <div class="modeTwo flex ac jc" @click="warning">
              <div class="iconBox bdrr50 flex jc ac">
                <SwapOutlined class="icon" />
              </div>
              <div>往返</div>
            </div>
          </div>

          <div class="gobackAll flex">
            <div class="goback">
              <div class="goOne flex ac">
                <div class="go">出发城市</div>
                <!-- <a-input v-model:value="value" placeholder="请输入出发城市" allow-clear /> -->
                <a-auto-complete
                  v-model:value="value"
                  :data-source="dataSource"
                  style="width: 200px"
                  placeholder="请输入出发城市"
                  :open="abb"
                  @select="selectCity"
                  @change="changeCity"
                />
              </div>
              <div class="goOne flex ac">
                <div class="go">到达城市</div>
                <!-- <a-input v-model:value="value2" placeholder="请输入到达城市" allow-clear /> -->
                <a-auto-complete
                  v-model:value="value2"
                  :data-source="dataSources"
                  style="width: 200px"
                  placeholder="请输入到达城市"
                  :open="acc"
                  @select="selectCitys"
                  @change="changeCitys"
                />
              </div>
              <div class="goOne flex ac">
                <div class="go">出发时间</div>
                <a-date-picker v-model:value="value3" @change="onChange" placeholder="请选择日期" />
              </div>
              <a-button type="primary" class="searchBtn" size="large" @click="goAirLists">
                <template v-slot:icon>
                  <SearchOutlined />
                </template>搜索
              </a-button>
            </div>
            <div style="padding:20px 0">
              <div class="zeOne"></div>
              <div class="change flex jc ac" @click="change">换</div>
              <div class="zeTwo"></div>
            </div>
          </div>
        </div>
        <img src="../assets/pic_sale.jpg" alt class="img" />
      </div>

      <div class="icoAll flex ac">
        <div class="icoOne flex ac jc">
          <img src="../assets/hui.png" alt class="icont" />
          <div>100%航协认证</div>
        </div>
        <div class="icoTwo flex ac jc">
          <img src="../assets/dun.png" alt class="icont" />
          <div>出行保证</div>
        </div>
        <div class="icoOne flex ac jc">
          <img src="../assets/dianhua.png" alt class="icont" />
          <div>7x24小时服务</div>
        </div>
      </div>

      <div class="cardAll flex">
        <img src="../assets/jipiao.png" alt class="icons" />
        <div>特价机票</div>
      </div>
      <div class="proposal flex ac jsa">
        <div
          v-for="(item,index) in proposalList"
          :key="index"
          class="proposalItem flex ac pore"
          @click="goAirList(item)"
        >
          <img :src="proposalList[0].cover" alt class="cover" />
          <div class="nameAll flex poab jsb">
            <div>{{item.departCity}} - {{item.destCity}}</div>
            <div style="font-size:18px">￥{{item.price}}</div>
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
import moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import api from "@/http/api";
import { useRouter } from "vue-router";
import { Modal } from "ant-design-vue";
import { h } from "vue";
interface Data {
  value: string;
  value2: string;
  value3: string;
  // disabledDate: string;
  proposalList: object[];
  dataSource: any;
  dataSources: any;
  abb: boolean;
  acc: boolean;
  departCode: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const router = useRouter();
    const data: Data = reactive<Data>({
      value: "",
      value2: "",
      value3: "",
      // disabledDate: '',
      proposalList: [],
      dataSource: [],
      dataSources: [],
      abb: true,
      acc: true,
      departCode: '',
    });
    const onChange = (date: any, dateString: any): void => {
      console.log(date, dateString);
    };
    const change = (): void => {
      const one = data.value;
      const two = data.value2;
      data.value = two;
      data.value2 = one;
    };
    const proposalAirs = (): void => {
      api
        .proposalAir()
        .then((res: any) => {
          console.log(res);
          data.proposalList = res.data;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const warning = (): void => {
      Modal.warning({
        title: "提示",
        content: "目前暂不支持往返，请选择单程机票",
      });
    };
    const goAirList = (item: any): void => {
      router.push({
        path: "/air/flights",
        query: {
          departCity: item.departCity,
          departCode: item.departCode,
          destCity: item.destCity,
          destCode: item.destCode,
          departDate: item.departDate,
        },
      });
      const history = {
        departCity: item.departCity,
        departCode: item.departCode,
        destCity: item.destCity,
        destCode: item.destCode,
        departDate: item.departDate,
      };
      localStorage.setItem("history", JSON.stringify(history));
    };
    const changeCity = (): void => {
      console.log(data.value);
      if (data.value !== "") {
        data.abb = true;
        api
          .airCity(data.value)
          .then((res) => {
            console.log(res);
            res.data.map((item: any) => {
              item.name = item.name.replace("市", "");
              data.dataSource.push(item.name);
              data.dataSource = data.dataSource.filter(
                (item1: any, index: number, arr: any) => {
                  return arr.indexOf(item1) === index;
                }
              );
            });
          })
          .catch((err: Error) => {
            console.log(err);
          });
      }
      if (data.value === "") {
        data.abb = false;
      }
    };
    const selectCity = (value: string): void => {
      console.log("selectCity", value);
      data.abb = false;
    };
    const changeCitys = (): void => {
      console.log(data.value2);
      if (data.value2 !== "") {
        data.acc = true;
        api
          .airCity(data.value2)
          .then((res) => {
            console.log(res);
            res.data.map((item: any) => {
              item.name = item.name.replace("市", "");
              data.dataSources.push(item.name);
              data.dataSources = data.dataSources.filter(
                (item1: any, index: number, arr: any) => {
                  return arr.indexOf(item1) === index;
                }
              );
            });
          })
          .catch((err: Error) => {
            console.log(err);
          });
      }
      if (data.value2 === "") {
        data.acc = false;
      }
    };
    // const focus = (): void => {
    // 	data.abb = false
    // }
    const selectCitys = (value: string): void => {
      console.log("selectCitys", value);
      data.acc = false;
    };
    const goAirLists = (): void => {
      router.push({
        path: "/air/flights",
        query: {
          // departCity: data.value,
          // departCode: item.departCode,
          // destCity: item.destCity,
          // destCode: item.destCode,
          // departDate: item.departDate,
        },
      });
    }
    onMounted(() => {
      proposalAirs();
    });
    return {
      ...toRefs(data),
      onChange,
      change,
      goAirList,
      warning,
      changeCity,
      selectCity,
      changeCitys,
      selectCitys,
      goAirLists,
      // focus
    };
  },
});
</script>

<style scoped lang='scss'>
.air_All {
  margin: 20px 0;
}
.airBox {
  width: 1000px;
}
.airIcon {
  width: 25px;
  height: 25px;
  margin-right: 3px;
}
.china {
  font-size: 20px;
  color: #ffa500;
}
.query {
  width: 390px;
  height: 350px;
  border: 1px solid #ddd;
}
.img {
  width: 590px;
  height: 350px;
  background: yellow;
}
.mode {
  width: 100%;
  height: 50px;
  font-size: 16px;
}
.iconBox {
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  margin-right: 10px;
}
.icon {
  color: #000;
}
.modeOne {
  width: 50%;
  border-top: 2px solid orange;
}
.modeTwo {
  width: 50%;
  background: rgb(238, 238, 238);
}
.go {
  width: 80px;
}
.gobackAll {
  padding: 20px;
}
.goback {
  width: 300px;
}
.goOne {
  margin-bottom: 20px;
}
.searchBtn {
  margin-left: 63px;
  width: 237px;
}
.zeOne {
  width: 25px;
  height: 16px;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.change {
  width: 30px;
  height: 30px;
  background: #ddd;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
}
.zeTwo {
  width: 25px;
  height: 16px;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.icoOne {
  width: 33%;
}
.icoTwo {
  width: 33%;
  height: 40px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.icoAll {
  width: 100%;
  background: rgb(245, 245, 245);
  height: 60px;
  border: 1px solid #ddd;
  margin-top: 20px;
  font-size: 16px;
  color: #000;
}
.icont {
  width: 30px;
  height: 32px;
}
.icons {
  width: 30px;
  height: 32px;
  margin-right: 3px;
}
.cardAll {
  color: #409eff;
  font-size: 20px;
  margin-top: 20px;
}
.proposal {
  border: 1px solid #ddd;
  width: 100%;
}
.cover {
  width: 100%;
  height: 150px;
}
.proposalItem {
  width: 23%;
  height: 180px;
}
.nameAll {
  width: 100%;
  bottom: 20px;
  padding: 5px 20px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 16px;
}
.go {
  width: 64px;
}
</style>