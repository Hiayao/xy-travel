<template>
  <div class="home_All flex jc">
    <div class="home pore">
      <a-carousel arrows autoplay>
        <template v-slot:prevArrow>
          <div class="custom-slick-arrow" style="left: 10px;zIndex: 1">
            <left-circle-outlined />
          </div>
        </template>
        <template v-slot:nextArrow>
          <div class="custom-slick-arrow" style="right: 10px">
            <right-circle-outlined />
          </div>
        </template>
        <div v-for="(item,index) in banner" :key="index">
          <img :src="'http://157.122.54.189:9095'+ item.url" alt class="banner" />
        </div>
      </a-carousel>
      <div class="search poab">
        <div class="flex">
          <div
            class="trapezoid flex jc pore"
            v-for="(item,index) in searchNav"
            :key="index"
            :class="{'bgd':fleg === index}"
            @click="choiceItem(index)"
          >
            <div class="navItem poab">{{item}}</div>
          </div>
        </div>
        <a-input-search
          v-model:value="value"
          :placeholder="values"
          style="width: 400px"
          size="large"
          @search="onSearch"
        />
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
import { useRouter } from "vue-router";
// interface searchItem{

// }
interface Data {
  banner: object[];
  searchNav: string[];
  fleg: number;
  values: string;
  value: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const router = useRouter();
    const data: Data = reactive<Data>({
      banner: [],
      searchNav: ["攻略", "酒店", "机票"],
      fleg: 0,  //选择搜索框上面的
      values: "搜索城市", //搜索框预显示文字
      value: "",  //搜索框内容
    });

    const choiceItem = (index: number): void => {
      data.fleg = index;
      if (data.fleg === 0) {
        data.values = "搜索城市";
      }
      if (data.fleg === 1) {
        data.values = "请输入城市搜索酒店";
      }
      if (data.fleg === 2) {
        router.push("/air");
      }
    };
   
    const onSearch = (value: string): void => {
      console.log(data.value);
      api
        .getCities(data.value)
        .then((res) => {
          console.log(res);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    };
    onMounted(() => {
      api
        .getBanners()
        .then((res: any) => {
          console.log(res);
          data.banner = res.data;
        })
        .catch((err: any) => {
          console.log(err);
        });
    });

    return {
      ...toRefs(data),
      choiceItem,
      onSearch,
    };
  },
});
</script>

<style scoped lang='scss'>
.home_All {
  width: 100%;
  height: 700px;
}
.home {
  width: 1280px;
  height: 700px;
  background: violet;
}
.banner {
  width: 100%;
  height: 700px;
}
/* For demo */
.ant-carousel ::v-deep(.slick-slide) {
  text-align: center;
  height: 700px;
  line-height: 700px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel ::v-deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel ::v-deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel ::v-deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel ::v-deep(.slick-slide h3) {
  color: #fff;
}
.search {
  top: 250px;
  left: 400px;
  width: 500px;
}
.trapezoid {
  /* 梯形 */
  height: 0;
  width: 82px;
  border-bottom: 40px solid rgba(0, 0, 0, 0.5);
  border-left: 0px solid transparent;
  border-right: 15px solid transparent;
  color: white;
}
.bgd {
  border-bottom: 40px solid rgb(192, 190, 190);
  color: #000;
}
.navItem {
  top: 8px;
}
</style>