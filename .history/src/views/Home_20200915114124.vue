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
          <div class="trapezoid flex jc pore" v-for="(item,index) in searchNav" :key="index">
        <div class="navItem poab">{{item}}</div> 
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
import api from "@/http/api";
// interface searchItem{

// }
interface Data {
  banner: object[];
  searchNav: string[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      banner: [],
      searchNav: ["攻略", "酒店", "机票"],
    });
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
  left: 400px
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
.navItem{
  top: 8px;
}
</style>