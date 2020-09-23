<template>
  <div class="flex jc" style="margin-top:20px">
    <div class="hotelBox">
      <a-breadcrumb>
        <a-breadcrumb-item>
          <span class="first fw6">酒店</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <span>成都市酒店预订</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="flex" style="margin:20px 0">
        <a-input v-model:value="city" placeholder="切换城市" style="width:20%;height: 42px;" />
        <a-range-picker v-model:value="time" @change="onChange" style="width:30%;margin:0 10px;" />
        <div style="width:20%;margin-right:10px">
          <a-input placeholder="人数未定" v-model:value="userNum" ref="userNumInput">
            <template v-slot:suffix>
              <a-tooltip title="Extra information">
                <user-outlined type="user" />
              </a-tooltip>
            </template>
          </a-input>
        </div>
        <a-button type="primary" style="height: 42px;">查看价格</a-button>
      </div>

      <div class="flex">
        <div class="quyu">
          <div class="flex" style="margin-bottom:20px">
            <div style="width:100px">区域:</div>
            <div class="listAll flex fwrap" v-if="flag === false">
              <div
                v-for="(item,index) in cityList.slice(0,18)"
                :key="index"
                class="listItem"
              >{{item.name}}</div>
              <div class="flex jsb" style="width:94px">
                <DoubleLeftOutlined class="icons" @click="more" />
                <div>等{{cityList.length}}个区域</div>
              </div>
            </div>
            <div class="listAll flex fwrap" v-if="flag === true">
              <div v-for="(item,index) in cityList" :key="index" class="listItem">{{item.name}}</div>
              <div class="flex jsb" style="width:94px">
                <DoubleLeftOutlined class="icon" @click="more" />
                <div>等{{cityList.length}}个区域</div>
              </div>
            </div>
          </div>

          <div class="flex jsb" style="width:460px">
            <div>
              均价
              <a-tooltip>
                <template v-slot:title>等级均价由平日价格计算得出，节假日价格会有上浮。</template>
                <QuestionCircleFilled />
              </a-tooltip>：
            </div>
            <div>
              <CrownFilled class="ico" />
              <CrownFilled class="ico" />
              <CrownFilled class="ico" />： ￥332
            </div>
            <div>
              <CrownFilled class="ico" />
              <CrownFilled class="ico" />
              <CrownFilled class="ico" />
              <CrownFilled class="ico" />： ￥521
            </div>
            <div>
              <CrownFilled class="ico" />
              <CrownFilled class="ico" />
              <CrownFilled class="ico" />
              <CrownFilled class="ico" />
              <CrownFilled class="ico" />： ￥768
            </div>
          </div>
        </div>

        <div class="map">
          <maps></maps>
        </div>
      </div>

      <div class="screen flex">
        <div class="screenOne flex column jc">
          <div class="flex jsb">
            <div>价格</div>
            <div>0-4000</div>
          </div>
          <a-slider id="test" v-model:value="money" :disabled="disabled" :max="max" />
        </div>
        <div class="screenOne flex column jc">
          <div>住宿等级</div>
          <div style="margin:8px 0px 10px">
            <a-select v-model:value="value1" style="width: 120px" ref="select" @change="ChangeOne">
              <a-select-option
                :value="item.name"
                v-for="(item,index) in condition.levels"
                :key="index"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="screenOne flex column jc">
          <div>住宿类型</div>
          <div style="margin:8px 0px 10px" class="flex jsb">
            <a-select v-model:value="value2" style="width: 120px" ref="select" @change="ChangeTwo">
              <a-select-option
                :value="item.name"
                v-for="(item,index) in condition.types"
                :key="index"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="screenOne flex column jc">
          <div>酒店设施</div>
          <div style="margin:8px 0px 10px">
            <a-select v-model:value="value3" style="width: 120px" ref="select" @change="ChangeThe">
              <a-select-option
                :value="item.name"
                v-for="(item,index) in condition.assets"
                :key="index"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="screenOne flex column jc">
          <div>酒店品牌</div>
          <div style="margin:8px 0px 10px">
            <a-select v-model:value="value4" style="width: 120px" ref="select" @change="ChangeFour">
              <a-select-option
                :value="item.name"
                v-for="(item,index) in condition.brands"
                :key="index"
              >{{item.name}}</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="screenOne flex ac jc">
          <a-button type="primary">撤销条件</a-button>
        </div>
      </div>

      <div>
        <div v-for="(item,index) in hotelList" :key="index" class="flex" style="margin-bottom:20px">
          <img :src="item.photos" alt class="img"/>
          <div class="news">
            <div>{{item.name}}</div>
            <div style="margin:20px 0">
              {{item.alias}}
              <CrownFilled class="ico" />
              <CrownFilled class="ico" />
              <CrownFilled class="ico" />
              {{item.hoteltype.name}}
            </div>
            <div><EnvironmentFilled />{{item.address}}</div>
          </div>
          <div class="other"></div>
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
import api from "@/http/api";
import { useRoute, useRouter } from "vue-router";
import { CityRes, cityData, Scenics } from "@/types";
import maps from "@/components/maps.vue";
import { DownOutlined } from "@ant-design/icons-vue";
interface Data {
  city: string;
  value: string;
  id: number;
  time: string[];
  userNum: string;
  path: string;
  cityRes: CityRes;
  cityData: cityData[];
  cityList: Scenics[];
  flag: boolean;
  money: number;
  disabled: boolean;
  max: number;
  condition: object;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  hotelList: object[];
}
export default defineComponent({
  name: "",
  props: {},
  components: { maps, DownOutlined },
  setup(props, ctx: SetupContext) {
    const route = useRoute();
    const router = useRouter();
    const data: Data = reactive<Data>({
      city: "",
      value: "",
      id: 0,
      time: [],
      userNum: "",
      path: "/post",
      cityRes: {
        data: [],
        total: 0,
      },
      cityData: [],
      cityList: [],
      flag: false,
      money: 4000,
      disabled: false,
      max: 4000,
      condition: {},
      value1: "不限",
      value2: "不限",
      value3: "不限",
      value4: "不限",
      hotelList: [],
    });
    const getCity = (): void => {
      api
        .getCities(data.value)
        .then((res) => {
          console.log(res);
          data.id = res.data[0].id;
          data.cityData = res.data;
          data.cityList = res.data[0].scenics;
           Detail();
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const more = (): void => {
      data.flag = !data.flag;
    };
    const ChangeOne = (value: any): void => {
      data.value1 = value;
    };
    const ChangeTwo = (value: any): void => {
      data.value2 = value;
    };
    const ChangeThe = (value: any): void => {
      data.value3 = value;
    };
    const ChangeFour = (value: any): void => {
      data.value4 = value;
    };
    const onChange = (): void => {};
    const getHotel = (): void => {
      api
        .gethotels()
        .then((res) => {
          console.log(res);
          data.condition = res.data;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const Detail = (): void => {
      console.log(data.id);
      api
        .hotelList({
          city: data.id,
          enterTime: "",
          leftTime: "",
          _limit: 20,
          _start: 0,
        })
        .then((res) => {
          console.log(res);
          data.hotelList = res.data;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    onMounted(() => {
      console.log(route.query);
      if (route.query.keyword) {
        data.value = route.query.keyword as string;
        getCity();
      }
      getHotel();
     
    });
    return {
      ...toRefs(data),
      getCity,
      onChange,
      more,
      getHotel,
      ChangeOne,
      ChangeTwo,
      ChangeThe,
      ChangeFour,
      Detail,
    };
  },
});
</script>

<style scoped lang='scss'>
.hotelBox {
  width: 1000px;
}
.quyu {
  width: 550px;
  height: 300px;
}
.map {
  width: 430px;
  height: 300px;
}
.listItem {
  margin-right: 10px;
}
.icons {
  transform: rotate(-90deg);
  -ms-transform: rotate(30deg);
  color: orange;
  text-align: left;
}
.icon {
  transform: rotate(90deg);
  -ms-transform: rotate(30deg);
  color: orange;
}
.ico {
  color: orange;
}
#container {
  width: 300px;
  height: 180px;
}
.screen {
  width: 100%;
  height: 100px;
  margin: 20px 0;
  border: 1px solid #ddd;
}
.screenOne {
  width: 25%;
  height: 80%;
  padding: 0px 20px;
  margin-top: 10px;
  border-right: 1px solid #ddd;
}
.img{
  width: 300px;
  height: 250px;
  margin-right: 30px;
}
.news{
  width: 300px;
  background: lightcoral;
}
.other{
  width: 300px;
  background: lightgreen;
}
</style>