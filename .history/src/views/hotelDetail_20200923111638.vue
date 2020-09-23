<template>
  <div class="flex jc" style="margin-top:20px">
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

      <div style="margin-top:20px">
        <div>
          {{list.name}}
          <CrownFilled class="ico" />
          <CrownFilled class="ico" />
          <CrownFilled class="ico" />
          <CrownFilled class="ico" />
          <CrownFilled class="ico" />
        </div>
        <div>{{list.alias}}</div>
        <div>
          <EnvironmentFilled />
          {{list.address}}
        </div>
      </div>
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
  list: object;
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const route = useRoute();

    const data: Data = reactive<Data>({
      ids: 0,
      name: "",
      imgList: [
        { url: require("../assets/1.jpg") },
        { url: require("../assets/2.jpg") },
        { url: require("../assets/3.jpg") },
        { url: require("../assets/4.jpg") },
        { url: require("../assets/5.jpg") },
        { url: require("../assets/6.jpg") },
      ],
      list: {},
    });
    const getDetail = (): void => {
      api
        .getHotelD(data.ids)
        .then((res) => {
          console.log(res);
          data.list = res.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    };
    onMounted(() => {
      console.log(route.query);
      data.ids = Number(route.query.ids as string);
      data.name = route.query.name as string;
      getDetail();
    });
    return {
      ...toRefs(data),
      getDetail,
    };
  },
});
</script>

<style scoped lang='scss'>
.DetailBox {
  width: 1000px;
}
.ico {
  color: orange;
}
</style>