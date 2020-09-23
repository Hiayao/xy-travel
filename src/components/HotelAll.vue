<template>
  <div class="container">
    <div class="box">
      <div>
        <div class="f-a f14 p-tb-2">
          <div>酒店</div>
          <RightOutlined class="f12 arrow m-lr-1" />
          <div>{{city}}酒店预订</div>
        </div>
        <div class="hotelIpt d-f">
          <div class="wid">
            <a-input v-model:value="city" placeholder="切换城市" />
          </div>
          <div class="m-lr-12">
            <a-range-picker
              v-model:value="times"
              :placeholder="['入住日期', '离店日期']"
              @change="onChange"
            >
              <template v-slot:suffixIcon>
                <CalendarOutlined />
              </template>
            </a-range-picker>
          </div>
          <div class="wid">
            <a-select
              v-model:value="value"
              style="width:100%"
              placeholder="人数未定"
              @change="handleChange"
            >
              <template v-slot:suffixIcon>
                <UserOutlined />
              </template>
              <a-select-option value="jack">Jack</a-select-option>
              <a-select-option value="lucy">Lucy</a-select-option>
              <a-select-option value="disabled" disabled>Disabled</a-select-option>
              <a-select-option value="Yiminghe">yiminghe</a-select-option>
            </a-select>
          </div>
          <div class="lookPrice">查看价格</div>
        </div>
      </div>
      <div class="f-j-bw">
        <div>
          <div class="d-f f14 m-tb-2">
            <div class="w-nowrap">区域：</div>
            <div>
              <div class="d-f f-w citys">
                <div
                  v-for="(item,index) in scenics.slice(0,num)"
                  :key="index"
                  class="p-l-2"
                >{{item.name}}</div>
              </div>
              <div class="cu-p p-l-2" @click="clickMore">
                <DownOutlined class="arroeDown" v-if="flag===false" />
                <UpOutlined class="arroeDown" v-else />
                等{{scenics.length}}个区域
              </div>
            </div>
          </div>
          <div class="f-a">
            <div class="p-r">
              均价
              <a-tooltip placement="topLeft">
                <template v-slot:title>
                  <span>等级均价由平日价格计算得出，节假日价格会有上浮。</span>
                </template>
                <QuestionCircleFilled class="ps f14 p-a-t" />
              </a-tooltip>
              <span class="p-l-2">：</span>
            </div>
            <div class="f-a">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <span class="m-l-1">￥332</span>
            </div>
            <div class="f-a m-l-4">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <span class="m-l-1">￥521</span>
            </div>
            <div class="f-a m-l-4">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <img src="../../assets/stars.png" alt="" class="starsImg">
              <span class="m-l-1">￥768</span>
            </div>
          </div>
        </div>
        <div id="wrapper"></div>
      </div>
      <div>
        <div v-for="(item,index) in hotels" :key="index" class="f-aj-bw hotelsItem">
          <div class="d-f">
            <img :src="item.photos" alt class="photos cu-p" @click="hotelDetail(item)"/>
            <div class="p-l-2">
              <div class="f24 f-color-b cu-p" @click="hotelDetail(item)">{{item.name}}</div>
              <div class="f16 f-color-9">{{item.alias}} {{item.hoteltype.name}}</div>
              <div class="m-tb-1 f-a">
                <a-rate :value="item.stars" disabled allow-half />
                <span class="m-l-1 stars">{{item.stars}}分</span>
                <div class="m-l-2 f16">
                  <span class="stars">{{item.num_collected}}</span>
                  <span>条评价</span>
                </div>
                <div class="m-l-5 f16">
                  <span class="stars">{{item.num_collected}}</span>
                  <span>篇游记</span>
                </div>
              </div>
              <div>
                <EnvironmentFilled />
                <span class="f-color-6">位于：{{item.address}}</span>
              </div>
            </div>
          </div>
          <div>
            <div v-for="(item1,index1) in item.products" :key="index1" class="f-aj-bw productsItem">
                <span>{{item1.name}}</span>
                <div class="f-a">
                  <span class="stars f18">￥{{item1.price}}</span>
                  <span>起</span>
                  <RightOutlined class="f12 m-l-1"/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import { useRoute,useRouter } from "vue-router";
import moment from "moment";
import api from "@/http/api";
import {
  PostsItem,
  ScenicsItem,
  ResItem,
  Res,
} from "@/components/hotelAll/type";
// import AMap from 'AMap'
// interface Data {
//   city: string;
//   times: string[];
//   size: string;
//   value: string;
//   scenics: ScenicsItem[];
//   num: number;
//   flag: boolean;
// }
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx) {
    let route = useRoute();
    let router = useRouter()
    let data = reactive({
      city: "",
      times: [],
      size: "default",
      value: "",
      scenics: [],
      num: 15,
      flag: false,
      hotels: [],
      _limit: 10,
      cityId: 239,
      _start: 0,
    });
    onMounted(() => {
      //定位
      let map = new AMap.Map("wrapper", {
        resizeEnable: true,
      });
      // console.log(AMap);
      if (route.query.value) {
        data.city = route.query.value;
        api
          .getCity({ name: data.city })
          .then((res) => {
            console.log(res.data);
            data.cityId = res.data[0].id
            data.scenics = res.data[0].scenics;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //获取城市
        AMap.plugin("AMap.CitySearch", function () {
          var citySearch = new AMap.CitySearch();
          citySearch.getLocalCity(function (status, result) {
            if (status === "complete" && result.info === "OK") {
              // 查询成功，result即为当前所在城市信息
              console.log(result);
              data.city = result.city;
              api
                .getCity({ name: result.city })
                .then((res) => {
                  // console.log(res.data[0].scenics);
                  data.scenics = res.data[0].scenics;
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        });
      }

      // 酒店列表
      api
        .getHotels({
          city: data.cityId
        })
        .then((res) => {
          console.log(res.data);
          let markerList = [];
          res.data.map((item) => {
            let longitude = item.location.longitude;
            let latitude = item.location.latitude;
            var marker = new AMap.Marker({
              position: new AMap.LngLat(longitude, latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: item.name,
            });
            markerList.push(marker);
          });
          // console.log(markerList);
          map.add(markerList);
          data.hotels = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    let onChange = (date, dateString) => {
      console.log(date, dateString);
    };
    let handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    let clickMore = () => {
      if (data.flag === false) {
        data.flag = true;
        data.num = data.scenics.length + 1;
      } else {
        data.flag = false;
        data.num = 15;
      }
    };
    let hotelDetail = (item) => {
      // console.log(item);
      router.push({path:'/hoteldetail',query:{detail:JSON.stringify(item)}})
    }
    return {
      ...toRefs(data),
      onChange,
      handleChange,
      clickMore,
      hotelDetail
    };
  },
});
</script>

<style scoped lang='scss'>
@import "../../style/hotel";
@import "../../style/common";
.ant-rate {
  font-size: 16px;
}
</style>