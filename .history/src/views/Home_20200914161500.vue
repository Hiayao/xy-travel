<template>
  <div class="home_All flex jc">
    <div class="home">
      <a-carousel arrows>
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
          <img :src="item.url" alt="" class="banner">
        </div>
      </a-carousel>
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
interface Data {
  banner: object[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) { 
    const data: Data = reactive<Data>({
      banner: []
    });
    onMounted(() => {
      api
        .getBanners()
        .then((res: any) => {
          console.log(res);
          data.banner = res.data
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
  height: 750px;
}
.home {
  width: 1280px;
  height: 750px;
  background: violet;
}
.banner{
  width: 100%;
  height: 100%;
}
</style>