<template>
  <div class="flex jc">
      <div class="DetailBox">
          <a-breadcrumb>
        <a-breadcrumb-item>
          <span class="first fw6">酒店</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <span>成都市酒店预订</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <span>{{name}}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      </div>
  </div>
</template>

<script lang='ts'>
import router from "@/router";
import api from "@/http/api";
import {
  defineComponent,
  reactive,
  toRefs,
  SetupContext,
  onMounted,
} from "vue";
import { useRoute } from "vue-router";
interface Data {
  ids: number;
  imgList: object[];
  name: string;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();

    const data: Data = reactive<Data>({
      ids: 0,
      name: '',
      imgList: [
        { url: require("../assets/1.jpg") },
        { url: require("../assets/2.jpg") },
        { url: require("../ssets/3.jpg") },
        { url: require("../assets/4.jpg") },
        { url: require("../assets/5.jpg") },
        { url: require("../assets/6.jpg") },
      ],
    });
    const getDetail = (): void => {
      api
        .getHotelD(data.ids)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    onMounted(() => {
      console.log(route.query);
      data.ids = Number(route.query.ids as string);
      data.name = route.query.name as string
      getDetail()
    });
    return {
      ...toRefs(data),
      getDetail,
    };
  },
});
</script>

<style scoped lang='scss'>
.DetailBox{
    width: 1000px;

}
</style>