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

      <div style="margin:20px 0">
        <div style="font-size:24px;color:#000">
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
			<div class="flex">
				<img :src="url" alt class="banner" />
        <div class="imgList flex fwrap">
          <div v-for="(item,index) in imgList" :key="index">
            <img :src="item.url" alt class="img" />
          </div>
        </div>
			</div>

			 <div>
        <div class="title f-w-7 f-aj-bw">
          <span class="flex1">价格来源</span>
          <span class="flex1 f-j">低价房型</span>
          <span class="flex1 p-r f-a">
            <span class="p-a-r">最低价格/每晚</span>
          </span>
        </div>
        <div class="titleItem f-aj-bw d-f" v-for="(item,index) in list.products" :key="index">
          <span class="flex1">{{item.name}}</span>
          <span class="flex1 f-j">{{item.bestType}}</span>
          <div class="f-a flex1 p-r">
            <div class="p-a-r">
              <span class="stars f16">￥{{item.price}}</span>
              <span>起</span>
              <RightOutlined class="f12 m-l-1 stars" />
            </div>
          </div>
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
	url: any;
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
			url: require("../assets/1.jpg"),
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
.banner {
  width: 620px;
  height: 350px;
}
.img {
  width: 180px;
  padding: 0 6px;
}
</style>