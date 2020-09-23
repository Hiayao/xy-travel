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
          <div class="flex">
            <div style="width:100px">区域:</div>
            <div class="listAll flex fwrap">
              <div v-for="(item,index) in cityList" :key="index" class="listItem">{{item.name}}</div>
              <div>
                <DoubleLeftOutlined class="icon" />
              </div>
            </div>
          </div>
        </div>
        <div class="map"></div>
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
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
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
    });
    const getCity = (): void => {
      api
        .getCities(data.value)
        .then((res) => {
          console.log(res);
          data.cityData = res.data;
          data.cityList = res.data[0].scenics;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    const onChange = (): void => {};
    onMounted(() => {
      console.log(route.query);
      if (route.query.keyword) {
        data.value = route.query.keyword as string;
        getCity();
      }
    });
    return {
      ...toRefs(data),
      getCity,
      onChange,
    };
  },
});
</script>

<style scoped lang='scss'>
.hotelBox {
  width: 1000px;
  height: 1000px;
  background: yellowgreen;
}
.quyu {
  width: 550px;
  height: 300px;
  background: yellow;
}
.map {
  width: 430px;
  height: 300px;
  background: wheat;
}
.listItem {
  margin-right: 10px;
}
.icon {
  transform: rotate(-90deg);
  -ms-transform: rotate(30deg);
}
</style>