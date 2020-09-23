<template>
  <div class="post_All flex jc">
    <div class="postBox flex jsb">
      <div class="postLeft">
        <div class="cityList">
          <div v-for="(item,index) in cityList" :key="index" class="listItem flex jsb ac">
            <div>{{item.type}}</div>
            <div>
              <RightOutlined class="RightOutlined"/>
            </div>
          </div>
        </div>
        <div class="recommend">
            <div class="recommendCity flex ac">推荐城市</div>
        </div>
      </div>
      <div class="postRight"></div>
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
import { Rescity, RescityItem } from "@/types";
interface Data {
  cityList: RescityItem[];
}
export default defineComponent({
  name: "",
  props: {},
  components: {},
  setup(props, ctx: SetupContext) {
    const data: Data = reactive<Data>({
      cityList: [],
    });

    onMounted(() => {
      api
        .getCityList()
        .then((res: Rescity) => {
          console.log(res);
          data.cityList = res.data;
        })
        .catch((err: Error) => {
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
.post_All {
  width: 100%;
  height: 500px;
  margin-top: 20px;
}
.postBox {
  width: 1000px;
  height: 100%;
}
.postLeft {
  width: 280px;
  height: 100%;
}
.postRight {
  width: 680px;
  height: 100%;
  background: yellowgreen;
}
.cityList {
  width: 100%;
}
.recommend {
  width: 100%;
  height: 230px;
  background: rebeccapurple;
}
.listItem {
  width: 100%;
  height: 50px;
  border: 1px solid #c9c9c9;
  padding: 20px;
}
.RightOutlined{
    color: #999;
}
.recommendCity{
    height: 50px;
    border-bottom: 1px solid #c9c9c9;
}
</style>